import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User as userService } from '../service/user';
import { CookieService } from 'ngx-cookie-service';
import * as UserAction from '../store/user/user.action';
import { Store } from '@ngrx/store';
import { loadCookies } from '../store/user/user.action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  registrationForm: FormGroup;
  loginForm: FormGroup;
  isSubmitting = false;
  loginFormContainer = false;
  userObject: { id: string; name: string; email: string } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: userService,
    private cookieService: CookieService,
    private store: Store,
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadUserFromCookies();
  }

  loadUserFromCookies() {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        this.store.dispatch(loadCookies({ user: userData }));
      } catch (e) {
        console.error('Error parsing user cookie', e);
        this.clearInvalidCookie();
      }
    }
  }

  clearInvalidCookie() {
    this.cookieService.delete('user');
    this.store.dispatch(loadCookies({ user: null }));
  }

  onSubmitRegistration() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.userService.addUser(this.registrationForm.value).subscribe({
        next: (res: any) => {
          alert('Registration successful! Welcome to our platform.');
          this.registrationForm.reset();
        },
        error: (err: any) => {
          alert('Failed to register. Please try again.');
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      Object.values(this.registrationForm.controls).forEach((c) =>
        c.markAsTouched(),
      );
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          alert('Login Successful');
          this.userObject = {
            id: res.id,
            name: res.firstName,
            email: res.email,
          };
          this.setUserCookie(this.userObject);
          this.store.dispatch(UserAction.setUser({ user: this.userObject }));
          this.loginForm.reset();
        },
        error: (err) => {
          console.log('Login Failed:', err);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      Object.values(this.loginForm.controls).forEach((c) => c.markAsTouched());
    }
  }

  setUserCookie(user: { id: string; name: string; email: string }) {
    this.cookieService.set(
      'user',
      JSON.stringify(user),
      7,
      '/',
      '',
      true,
      'Lax',
    );
  }

  toggleLoginForm() {
    this.loginFormContainer = !this.loginFormContainer;
  }
}
