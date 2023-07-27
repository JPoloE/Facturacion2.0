export interface IClient {
  id: number;
  tipo_cliente: string;
  tipo_documento: string;
  nit: string;
  tipo_cliente_string: string;
  nombres: string;
  nombre_completo: string;
  apellido_1: string;
  apellido_2: string;
  email: string;
  telefono_1: string;
  telefono_2: string;
  pais: string;
  departamento: string;
  ciudad: string;
  tipo_residencia: string;
  localidad: string;
  localidad_2: string;
  direccion: string;
  punto_referencia: string;
  estado: string;
  fechalog: Date;
  fechalog_string: string;
  id_usuario: number;
  usuario: string;
  medio_enterado_cliente: string;
}
