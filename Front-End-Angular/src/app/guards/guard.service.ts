import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  realRol: string;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if (!this.tokenService.isLogged() ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}