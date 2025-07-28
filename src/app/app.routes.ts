import { Routes } from '@angular/router';
import { Todo } from './todo/todo';
import { Newspaper } from './newspaper/newspaper';
import { Home } from './home/home';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'todo', component: Todo },
  { path: 'newspaper', component: Newspaper },
];
