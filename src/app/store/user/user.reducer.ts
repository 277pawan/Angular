import { createReducer, on } from '@ngrx/store';
import * as UserAction from './user.action';

export const initialState: UserAction.UserState = {
  user: null,
};
export const userReducer = createReducer(
  initialState,
  on(UserAction.setUser, (state, { user }) => ({
    ...state,
    user,
  })),

  on(UserAction.loadCookies, (state, { user }) => ({
    ...state,
    user,
  })),
);
