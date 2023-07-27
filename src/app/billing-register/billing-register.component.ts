import { Component } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppApiService } from '../services/app-api.service';

@Component({
  selector: 'app-billing-register',
  templateUrl: './billing-register.component.html',
  styleUrls: ['./billing-register.component.scss']
})
export class BillingRegisterComponent {

  constructor(private dialogRef: MatDialogRef<BillingRegisterComponent>
    , private api: AppApiService){}

    saveFunction(){
      console.log("*****Guardar factura*****");
      this.dialogRef.close();
    }
  backFunction(){
    this.dialogRef.close();
  }

}
