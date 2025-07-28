import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Navbar, Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
