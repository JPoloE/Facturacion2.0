import { Component } from '@angular/core';

//Tabla 1
export interface PeriodicElement {
  year : number;
  uvt : number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {year: 2023, uvt:24.412},
  {year: 2022, uvt:38.004},
  {year: 2021, uvt:36.308}
];

//Tabla 2

export interface RFuente{
  conceptos: string;
  baseUVT: number;
  basePesos: number;
  tarifaRetencion: number;
}

const datosr: RFuente[] = [
  {conceptos: 'Compras generales (declarantes)', baseUVT:412, basePesos: 20, tarifaRetencion:10},
  {conceptos: 'Compras generales (no declarantes)', baseUVT:412, basePesos: 20, tarifaRetencion:10},
  {conceptos: 'Compra de bienes ', baseUVT:412, basePesos: 20, tarifaRetencion:10},
  {conceptos: 'Servicios generales', baseUVT:412, basePesos: 20, tarifaRetencion:10},
  {conceptos: 'Servicio de transporte de carga', baseUVT:412, basePesos: 20, tarifaRetencion:10},
];



@Component({
  selector: 'app-utv',
  templateUrl: './utv.component.html',
  styleUrls: ['./utv.component.scss'],
  
})

export class UtvComponent {
  //Tabla 1
  displayedColumns: string[] = ['year', 'uvt'];
  dataSource = ELEMENT_DATA;
  
  //Tabla2
  rcols: string[] = ['conceptos', 'baseUVT', 'basePesos', 'tarifaRetencion', "acciones"];
  datar = datosr;

  accion1(row: RFuente) {
    console.log('Botón 1 pulsado en la fila:', row);
  }

  accion2(row: RFuente) {
    console.log('Botón 2 pulsado en la fila:', row);
  }

  accion3(row: RFuente) {
    console.log('Botón 3 pulsado en la fila:', row);
  }

}
