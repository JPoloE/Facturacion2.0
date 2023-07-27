import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataSharingService } from '../services/data-sharing.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-construction-billing-configuration',
  templateUrl: './construction-billing-configuration.component.html',
  styleUrls: ['./construction-billing-configuration.component.scss']
})
export class ConstructionBillingConfigurationComponent{
  selectedOption: string = 'Persona Natural';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  checkboxes: { label: string, checked: boolean }[] = [];

  matcher = new MyErrorStateMatcher();

  sharedCheckboxes: any;


  onOptionSelected() {
    
  }
}