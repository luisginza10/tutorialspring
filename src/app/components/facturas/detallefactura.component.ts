import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/model/factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.component.html',
  styleUrls: ['./detallefactura.component.css']
})
export class DetallefacturaComponent implements OnInit {
  factura: Factura;
  titulo = 'Factura';

  constructor(private facturaService: FacturasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(fact => {
        this.factura = fact;
      });
    });
  }

}
