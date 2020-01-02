import { Producto } from './producto';

export class Itemfactura {
  id?: number;
  producto?: Producto;
  cantidad = 1;
  precio?: number;
  subtotal?: number;
  exenta?: number;
  iva10?: number;
  iva5?: number;
  public calcularImporte(): number {
    this.subtotal = this.cantidad * this.precio;
    return this.subtotal;
  }
}

