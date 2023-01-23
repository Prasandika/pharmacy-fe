import { UserRole } from 'src/app/enums/user-role.enum';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  /**
   *
   */
  constructor(private toastrService: ToastrService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot): boolean {
    let role = <UserRole>localStorage.getItem('role') || '';

    let isAuthenticated =
      route.data.roles.filter((ro: UserRole) => ro == role).length > 0;

    if (!isAuthenticated) {
      console.log('not authorized');
      this.router.navigateByUrl('/auth/login');
      this.toastrService.error('Not Authorized');
    }

    return isAuthenticated;
  }
}
