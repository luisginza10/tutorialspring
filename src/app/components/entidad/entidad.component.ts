import { Component, OnInit} from '@angular/core';
import { Entidad } from 'src/app/model/entidad';
import { EntidadService } from 'src/app/services/entidad.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {
  entidades: Entidad[] = [];
  paginador: any;
  constructor(private entidadServ: EntidadService, private activateRouter: ActivatedRoute) {}

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      let page: number = +params.page;
      if (!page) {
        page = 0;
      }
      this.entidadServ.getEntidades(page).subscribe(res => {
        this.entidades = res.content as Entidad[];
        this.paginador = res;
        //console.log(this.paginador);
      });
    });
  }

  delete(entidad: Entidad): void {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar la entidad: ${entidad.nombrerazon}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.entidadServ.delete(entidad.id).subscribe(res => {
          //saca de la lista lo eliminado
          this.entidades = this.entidades.filter(enti => enti !== entidad);
          Swal.fire(
            'Eliminado!',
            `Entidad: ${entidad.nombrerazon} eliminado con exito.!`,
            'success'
          );
        });
      }
    });
  }
}
