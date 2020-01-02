import { Injectable } from '@angular/core';
import {Factura} from '../model/factura';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private url = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.url}/${id}`);
  }

  update(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(this.url, factura).pipe(
      catchError(e => {
          return throwError(e);
      })
    );
  }
  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.url, factura);
  }

}
