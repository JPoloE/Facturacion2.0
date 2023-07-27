import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import {AutocompleteFilterExample} from './autocomplete-filter-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {HttpClientModule} from '@angular/common/http'
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingComponent } from './billing/billing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientCoincidenceComponent } from './client-coincidence/client-coincidence.component';
import { BillingRegisterComponent } from './billing-register/billing-register.component';
import { CreditNoteRegisterComponent } from './credit-note-register/credit-note-register.component';
import { BillingConfigurationComponent } from './billing-configuration/billing-configuration.component';
import { ConstructionBillingConfigurationComponent } from './construction-billing-configuration/construction-billing-configuration.component';
import { ResponsabilidadesComponent } from './responsabilidades/responsabilidades.component';
import { ModalResponsabilidadesComponent } from './modal-responsabilidades/modal-responsabilidades.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    ClientCoincidenceComponent,
    BillingRegisterComponent,
    CreditNoteRegisterComponent,
    BillingConfigurationComponent,
    ConstructionBillingConfigurationComponent,
    ResponsabilidadesComponent,
    ModalResponsabilidadesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
