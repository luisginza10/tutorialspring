import {Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authservice.token;
    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
