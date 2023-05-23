import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN_COOKIE_NAME } from '../common/constants';
import { DecodedJwtToken } from '../common/models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private readonly router: Router,
              private readonly cookieService: CookieService) {}

  public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    if (!accessToken) {
      return this.router.createUrlTree(['/404']);
    }
    const decodedToken = jwtDecode(accessToken) as DecodedJwtToken;
    if (!decodedToken.id || !decodedToken.name) {
      return this.router.createUrlTree(['/404']);
    }
    return true;
  }
}
