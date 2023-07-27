import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-coincidence',
  templateUrl: './client-coincidence.component.html',
  styleUrls: ['./client-coincidence.component.scss']
})
export class ClientCoincidenceComponent implements OnInit {

  clientRadio: any;
  clientsCoincidences;

  constructor(
    public dialogRef: MatDialogRef<ClientCoincidenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('coincidencias', data.coincidences)
    this.clientsCoincidences = data.coincidences
   }

  ngOnInit(): void {
  }

  CreateNewClient(){
    this.dialogRef.close({client: null});
  }

  selLoadClient(){
    this.dialogRef.close({client: this.clientRadio});
  }

}
