export interface IConstruction {
  id: number;
  nombre: string;
  direccion_cliente: boolean;
  pais: string;
  departamento: string;
  ciudad: string;
  tipo_residencia: string;
  localidad: string;
  localidad_2: string;
  direccion: string;
  punto_referencia: string;
  nombre_interesado: string;
  telefono_interesado: string;
  email_interesado: string;
  observaciones: string;
  estado: string;
  fechalog: Date;
  fechalog_string: string;
  id_usuario: number;
  usuario: string;

  //SISO
  siso_nombre: string;
  siso_telefono: string;
  siso_correo: string;
  requiere_siso: boolean;
}
