import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-modal-responsabilidades',
  templateUrl: './modal-responsabilidades.component.html',
  styleUrls: ['./modal-responsabilidades.component.scss']
})
export class ModalResponsabilidadesComponent {
  checkboxes: { label: string, checked: boolean }[] = [];
  newCheckboxName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalResponsabilidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checkboxes: { label: string, checked: boolean }[] },
    private dataSharingService: DataSharingService // Inyectamos el servicio aquí.
  ) {
    // Copiamos la lista recibida a la lista local para trabajar con ella.
    this.checkboxes = [...data.checkboxes];
  }

  addNewCheckbox() {
    // Agregamos un nuevo checkbox con el nombre ingresado y estado no marcado.
    if (this.newCheckboxName.trim() !== '') {
      this.checkboxes.push({ label: this.newCheckboxName, checked: false });
      this.newCheckboxName = ''; // Limpiamos el campo de texto después de agregar el nuevo checkbox.
    }
  }

  saveChanges() {
    // Actualizamos los checkboxes en el servicio antes de cerrar el modal.
    this.dataSharingService.updateCheckboxes(this.checkboxes);
    this.dialogRef.close({ checkboxes: this.checkboxes });
  }
}
