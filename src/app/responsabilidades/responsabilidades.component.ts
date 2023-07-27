import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { ModalResponsabilidadesComponent } from '../modal-responsabilidades/modal-responsabilidades.component';
import { DialogConfig } from '@angular/cdk/dialog';


@Component({
  selector: 'app-responsabilidades',
  templateUrl: './responsabilidades.component.html',
  styleUrls: ['./responsabilidades.component.scss']
})
export class ResponsabilidadesComponent {
  checkboxes: { label: string, checked: boolean }[] = [
    { label: 'impuesto renta y complementario regimen ordinario', checked: false },
    { label: 'retencion en la fuente a titulo de renta', checked: false },
    { label: 'gran contribuyente', checked: false },
    { label: 'autocorrector', checked: false },
    { label: 'impuesto sobre las ventas', checked: false },
  ];

  constructor(private dialog: MatDialog, private dataSharingService: DataSharingService) {}

  openModal() {
    const dialogRef = this.dialog.open(ModalResponsabilidadesComponent, {
      data: { checkboxes: this.checkboxes }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.checkboxes = data.checkboxes;
        this.dataSharingService.updateCheckboxes(this.checkboxes); // Actualizamos los checkboxes en el servicio.
      }
    });
  }
}
