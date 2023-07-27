import { Component } from '@angular/core';
import { AppApiService } from '../services/app-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-note-register',
  templateUrl: './credit-note-register.component.html',
  styleUrls: ['./credit-note-register.component.scss']
})
export class CreditNoteRegisterComponent {
  constructor(private dialogRef: MatDialogRef<CreditNoteRegisterComponent>
    , private api: AppApiService){}

    saveFunction(){
      console.log("*****Guardar nota credito*****");
      this.dialogRef.close();
    }
  backFunction(){
    this.dialogRef.close();
  }
}
