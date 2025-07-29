import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.action';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state ?? null,
);
