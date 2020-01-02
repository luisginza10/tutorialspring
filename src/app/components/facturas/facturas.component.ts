import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import Swal from 'sweetalert2';
import { Factura } from 'src/app/model/factura';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from 'src/app/services/entidad.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/model/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Itemfactura } from 'src/app/model/itemfactura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  titulo = 'Factura';
  factura = new Factura();
  producto:string;

  myControl = new FormControl();
  filteredOptions: Observable<Producto[]>;

  constructor(private facturaService: FacturasService,
    private activateRouter: ActivatedRoute,
    private entidadService: EntidadService,
    private productoService: ProductoService,
    private router: Router) { }

  ngOnInit() {
    this.activateRouter.paramMap.subscribe(params => {
      const clienteId = +params.get('entidadId');
      this.entidadService.getEntidad(clienteId).subscribe(entidad => {
        this.factura.entidad = entidad;
      });
    });
    //si lo consulado es string pasa a ser un objeto al momento de la seleccion
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.descripcion),
        flatMap(value => value ? this._filter(value) : [])
      );
  }
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoService.filtrarDesc(filterValue);
  }
  mostrarDescripcion(producto?: Producto): string | undefined {
    return producto ? producto.descripcion : undefined;
  }
  seleccionProducto(event: MatAutocompleteSelectedEvent) {
    const producto = event.option.value as Producto;
    if (this.existeItem(producto.id)) {
      this.incrementaCant(producto.id);
    } else {
      const nuevoItem = new Itemfactura();
      nuevoItem.precio = 600;
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }
    this.myControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }
  updateCantidad(id: number, event: any) {
    const cantidad = event.target.value as number;
    if (cantidad == 0) {
      return this.borrarlinea(id);
    }
    this.factura.items = this.factura.items.map((item: Itemfactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }
  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: Itemfactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }
  incrementaCant(id: number) {
    this.factura.items = this.factura.items.map((item: Itemfactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });

  }
  borrarlinea(id: number) {
    this.factura.items = this.factura.items.filter((item: Itemfactura) => id !== item.producto.id);
  }
  saveOrUpdate(): void {
    this.factura.estado = 1;
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Desea guardar factura ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        console.log(this.factura);
        this.facturaService.create(this.factura).subscribe(res => {
          Swal.fire(
            'Guardado!',
            `Factura guardado con exito.!`,
            'success'
          );
          this.router.navigate(['/entidad']);
        });
      }
    });
  }
}
