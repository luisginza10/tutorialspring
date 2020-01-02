import {Injectable, InjectionToken} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          // tslint:disable-next-line: comment-format
          //401 no logueado o expiro sesion
          if (e.error.error === 'invalid_token') {
            this.mjsError('Atencion.!', 'Tiempo de sesión expirado, vuelva a iniciar sesión por favor.!', 'warning');
            this.authservice.logout();
          } else {
            this.mjsError('Atencion.!', 'Debes iniciar sesión antes de acceder a este recurso.!', 'warning');
          }
          this.router.navigate(['/login']);
        }
        if (e.status === 403) {
          // tslint:disable-next-line: comment-format
          //403 no tiene permiso suficiente
          this.mjsError('Info.!', `Hola ${this.authservice.usuario.username}, no tienes los permisos suficientes para realizar esta acción
          , contacte con el administrador.`, 'warning');
        }
        return throwError(e);
      })
    );
  }
  mjsError(titulo: string, msj: string, tipoinfo: any): void {
    Swal.fire({
      title: titulo,
      text: msj,
      type: tipoinfo,
      confirmButtonText: 'Aceptar'
    });
  }
}
