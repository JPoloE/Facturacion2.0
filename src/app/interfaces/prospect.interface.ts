export interface IProspect {
  id: number;
  consecutivo: string;
  prioridad: string;
  responsable: number;
  medio_contacto: string;
  observaciones: string;
  otro_articulo: string;
  nota: string;
  //Cliente
  id_cliente: number;
  nit_cliente: string;
  tipo_cliente: string;
  tipo_cliente_string: string;
  tipo_documento_cliente: string;
  tipo_documento_cliente_string: string;
  nombres_cliente: string;
  nombre_completo_cliente: string;
  apellido_1_cliente: string;
  apellido_2_cliente: string;
  email_cliente: string;
  alias_cotizacion_cliente: string;
  telefono_1_cliente: string;
  telefono_2_cliente: string;
  pais_cliente: string;
  departamento_cliente: string;
  ciudad_cliente: string;
  tipo_residencia_cliente: string;
  localidad_cliente: string;
  localidad_cliente_2: string;
  direccion_cliente: string;
  punto_referencia_cliente: string;
  medio_enterado_cliente: string;
  //Obra
  id_obra: number;
  nombre_obra: string;
  direccion_cliente_obra: boolean;
  pais_obra: string;
  departamento_obra: string;
  ciudad_obra: string;
  tipo_residencia_obra: string;
  localidad_obra: string;
  localidad_obra_2: string;
  direccion_obra: string;
  punto_referencia_obra: string;
  nombre_interesado: string;
  telefono_interesado: string;
  email_interesado: string;
  observaciones_obra: string;
  //Facturación
  razon_social_fact: string;
  tipo_documento_fact: string;
  tipo_documento_fact_string: string;
  nit_fact: string;
  telefono_fact: string;
  email_fact: string;
  tipo_residencia_fact: string;
  localidad_cliente_fact: string;
  direccion_fact: string;
  //SISO
  siso_nombre: string;
  siso_telefono: string;
  siso_correo: string;
  requiere_siso: boolean;

  fechalog: Date;
  fechalog_string: string;
  id_usuario: number;

  fecha_separador: Date;
}
