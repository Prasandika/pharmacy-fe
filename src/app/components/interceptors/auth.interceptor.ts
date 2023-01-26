import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('authToken') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('authToken')
        ),
      });
      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status == 401) {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userId');
              localStorage.removeItem('userJSON');
              this.router.navigateByUrl('/auth/login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}
