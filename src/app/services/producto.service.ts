import { Injectable } from '@angular/core';
import {Producto} from '../model/producto';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  filtrarDesc(desc: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/filtrar/${desc}`);
  }

}
