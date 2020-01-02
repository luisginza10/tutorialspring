import { Injectable } from '@angular/core';
import { Entidad } from '../model/entidad';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  /*los manejos de errores como no autorizado y cabeceras
  estan siendo manejados por los interceptors */
  private url = 'http://localhost:8080/api/entidades';
  constructor(private http: HttpClient) { }

  /*
  private isNoAutorizado(e): boolean {
    if (e.status === 401) {
      // tslint:disable-next-line: comment-format
      //no logueado o expiro sesion
      if (e.error.error === 'invalid_token') {
        this.mjsError('Atencion.!', 'Tiempo de sesión expirado, vuelva a iniciar sesión por favor.!', 'warning');
        this.authservice.logout();
      } else {
        this.mjsError('Atencion.!', 'Debes iniciar sesión antes de acceder a este recurso.!', 'warning');
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status === 403) {
      // tslint:disable-next-line: comment-format
      //no tiene permiso suficiente
      this.mjsError('Info.!', `Hola ${this.authservice.usuario.username}, no tienes los permisos suficientes para realizar esta acción
      , contacte con el administrador.`, 'warning');
      return true;
    }
    return false;
  }
  */
  /*
  getEntidades(): Observable<Entidad[]> {
    return this.http.get<Entidad[]>(this.url);
  }
  */

  getEntidades(page: number): Observable<any> {
    return this.http.get(`${this.url}/pages/${page}`).pipe(
      map((response: any) => {
        return response;
      }
      )
    );
  }
  getEntidad(id: number): Observable<Entidad> {
    return this.http.get<Entidad>(`${this.url}/${id}`);
  }
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.url + '/regiones');
  }

  create(entidad: Entidad): Observable<Entidad> {
    return this.http.post<Entidad>(this.url, entidad).pipe(
      map((response: any) => response.entidad as Entidad),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        } else {
          this.mjsError('Atencion.!', 'La entidad que intentas guardar ya exite, verifique.!', 'warning');
        }
        console.log(e.error.error);
        return throwError(e);
      })
      );
  }

  update(entidad: Entidad): Observable<Entidad> {
    /*cuando la relacion es bidireccional, en este caso entidad,factura
    se debe poner a null la asociacion o tambien configurar en el
    backend, allowSetters = true para evitar el error recursivo
    de querer actualizar solamente la entidad y sin esta solucion
    trataria de actualizar la asociacion creando bucle infinito*/
    entidad.facturas = null;
    return this.http.put<Entidad>(this.url, entidad).pipe(
      catchError(e => {
          return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Entidad> {
    return this.http.delete<Entidad>(`${this.url}/${id}`);
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
