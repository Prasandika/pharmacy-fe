import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.get().subscribe((users) => (this.users = users));
  }

  users: User[] = [];

  login(email: string, password: string) {
    console.log(email, password);
    var res = this.httpClient.post<User>(
      `${environment.API_URL}/users/authenticate`,
      {
        email: email,
        password: password,
      }
    );

    res.subscribe(
      (res: User) => {
        console.log('res', res);
        if (res.role == UserRole.Admin) {
          this.router.navigateByUrl('products');
        } else if (res.role == UserRole.Regular) {
          this.router.navigateByUrl('dashboard');
        }
        this.toastrService.success('Login Success');
        localStorage.setItem('authToken', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userJSON', JSON.stringify(res));
      },
      (err) => {
        console.log('err', err);
        if (err.error?.message?.startsWith('Error:')) {
          this.toastrService.error(err.error?.message?.split('Error:')[1]);
        }
      }
    );
  }

  register(value: User) {
    var res = this.httpClient.post(`${environment.API_URL}/users`, value);

    res.subscribe(
      (res) => {
        console.log('res', res);
        this.login(value.email, value.password);
        this.toastrService.success('Register Success');
      },
      (err) => {
        console.log('err', err);
        if (err.error?.message?.startsWith('Error:')) {
          this.toastrService.error(err.error?.message?.split('Error:')[1]);
        }
      }
    );
  }

  getCurrentUser(): User {
    const user = <User>JSON.parse(localStorage.getItem('userJSON') || '');
    return user;
  }

  getById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.API_URL}/users` + userId);
  }

  get(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}/users`);
  }

  getFullName(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    return user?.firstName + ' ' + user?.lastName;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userJSON');
    this.router.navigateByUrl('/auth/login');
  }
}
