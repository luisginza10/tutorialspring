import { Itemfactura } from './itemfactura';
import { Entidad } from './entidad';

export class Factura {
  id?: number;
  fecha?: Date;
  nrodoc?: string;
  total?: number;
  cotizacion?: number;
  condicion?: number;
  estado?: number;
  nroremito?: number;
  createAt?: Date;
  items?: Itemfactura[] = [];
  entidad?: Entidad;
  calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: Itemfactura) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
