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
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Both forms
  userFromCookies: any;
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
    // Registration form
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Login form (only email, password)
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.userFromCookies = this.cookieService.get('user');
    this.store.dispatch(
      loadCookies({ user: JSON.parse(this.userFromCookies) }),
    );
  }

  // get User from cookie function

  // Registration submit
  onSubmitRegistration() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;

      // Add User API call
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

  // Login submit (example stub)
  onLogin() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          alert('Login Successfull');
          this.userObject = {
            id: res.id,
            name: res.firstName,
            email: res.email,
          };
          this.cookieService.set('user', JSON.stringify(this.userObject), 7);
          this.store.dispatch(UserAction.setUser({ user: this.userObject }));
          this.loginForm.reset();
        },
        error: (err) => {
          console.log('Login Failed:-', err);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      Object.values(this.loginForm.controls).forEach((c) => c.markAsTouched());
    }
  }

  toggleLoginForm() {
    this.loginFormContainer = !this.loginFormContainer;
  }
}
