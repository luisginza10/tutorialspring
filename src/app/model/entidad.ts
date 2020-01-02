import { Region } from './region';
import { Factura } from './factura';

export interface Entidad {
  id?: number;
  ciruc?: string;
  direccion?: string;
  email?: string;
  nombrerazon?: string;
  telefono?: string;
  celular?: string;
  region?: Region;
  facturas?: Array<Factura>;
}
