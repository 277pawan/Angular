import { createAction, props } from '@ngrx/store';

// set User action
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  user: User | null;
}

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User | null }>(),
);

// load user data from cookies
export const loadCookies = createAction(
  '[User] Load user from cookies',
  props<{ user: User | null }>(),
);

export const increment = createAction('[Counter Component] Increment');

export const decrement = createAction('[Counter Component] Decrement');
