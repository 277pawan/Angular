import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user/user.selector';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserState } from '../store/user/user.action';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user$: Observable<UserState | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
}
