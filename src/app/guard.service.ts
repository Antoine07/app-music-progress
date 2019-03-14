import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authS: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | boolean {
    // this.authS.testAuth(); // test de connexion

    if (this.authS.authenticated() === true) return true;
    
    // console.log('no auth');

    this.router.navigate(
      ['/login'],
      { queryParams: { messageError: 'Error authentification' } }
    );

    return false;
  }
}