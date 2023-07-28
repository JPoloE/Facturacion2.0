import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.scss']
})
export class RetencionesComponent implements OnInit{
  // Variables para los inputs y combobox
  input1 = new FormControl('', Validators.required);
  input2 = new FormControl('', Validators.required);
  input3 = new FormControl('', Validators.required);
  input4 = new FormControl('', Validators.required);
  input5 = new FormControl('', Validators.required);
  input6 = new FormControl('', Validators.required);
  input7 = new FormControl('', Validators.required);
  comboBox1Value: string ='';
  comboBox2Value: string ='';

  // Opciones para los combobox
  comboBox1Options: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];
  comboBox2Options: string[] = ['Selección A', 'Selección B', 'Selección C'];

  constructor() { }

  ngOnInit(): void {
  }

  // Método para manejar el cambio en el primer combobox
  onComboBox1Change(event: MatSelectChange) {
    this.comboBox1Value = event.value;
  }

  // Método para manejar el cambio en el segundo combobox
  onComboBox2Change(event: MatSelectChange) {
    this.comboBox2Value = event.value;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Aquí puedes realizar la lógica que desees con los valores de los inputs y combobox.
    // Por ejemplo, puedes enviar los datos al servidor o procesarlos de alguna otra manera.
  }

}
