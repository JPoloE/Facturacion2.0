import { Component, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppApiService } from '../services/app-api.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillingComponent{

  constructor(private dialogRef: MatDialogRef<BillingComponent>
    , private api: AppApiService){}

    backFunction(){
      this.dialogRef.close();
    }

    saveFunction(){
      console.log("*****Guardar Configuracion de facturacion*****");
      this.dialogRef.close();
    }
}

export class Ibilling{
  
}


