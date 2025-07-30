import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface userType {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient) {}

  addUser(userData: userType): Observable<any> {
    const url = 'https://dummyjson.com/users/add';
    return this.http.post(url, userData);
  }

  loginUser(userData: userType) {
    const url = 'https://dummyjson.com/user/login';
    return this.http.post(url, userData);
  }
}
