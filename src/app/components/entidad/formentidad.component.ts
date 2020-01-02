import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/model/entidad';
import { EntidadService } from 'src/app/services/entidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from 'src/app/model/region';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/model/factura';
declare var M: any;

@Component({
  selector: 'app-formentidad',
  templateUrl: './formentidad.component.html',
  styleUrls: ['./formentidad.component.css']
})
export class FormentidadComponent implements OnInit {
  private errores: string[];
  public id;
  entidad: Entidad = {};
  regiones: Region[];
  constructor(private entiserv: EntidadService, private router: Router,
    private activateRouter: ActivatedRoute, private facturaService: FacturasService) {}

  ngOnInit() {
    this.entiserv.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    });
    this.activateRouter.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.entiserv.getEntidad(this.id).subscribe((entidad) => {
          this.entidad = entidad;
        });
      }
    });
  }
  saveOrUpdate() {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    this.entiserv.create(this.entidad).subscribe(res => {
      this.msj(`Entidad guardado con exito.!`, 'success');
      this.router.navigate(['/entidad']);
    }, err => {
      this.errores = err.error.errors as string[];
      let msg = '';
      for (let i = 0; i < this.errores.length; i++) {
        msg += `${this.errores[i]}<br/>`;
      }
      M.toast({html: msg});
    });
  }
  update() {
    this.entiserv.update(this.entidad).subscribe(res => {
      this.msj(`Entidad actualizado con exito.!`, 'success');
      this.router.navigate(['/entidad']);
    });
  }
  anulaFactura(factura: Factura): void {
    const enti: Entidad = {};
    enti.id = this.entidad.id;
    factura.estado = 2;
    factura.entidad = enti;
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea anular la factura nro.: ${factura.id}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, anular!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        //console.log(factura);
        this.facturaService.update(factura).subscribe(res => {
          Swal.fire(
            'Anulado!',
            `Factura nro.: ${factura.id} anulado con exito.!`,
            'success'
          );
        });
      }
    });
  }
  comparaRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
  msj(titulo: string, tipoinfo: any): void {
    Swal.fire({
      position: 'top-end',
      title: titulo,
      type: tipoinfo,
      confirmButtonText: 'Aceptar'
    });
  }
}
