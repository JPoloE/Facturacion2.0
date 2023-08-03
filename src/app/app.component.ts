import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TaskLeverCoreService } from './services/task-lever-core.service';
import { IConstruction } from './interfaces/construction.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ClientCoincidenceComponent } from './client-coincidence/client-coincidence.component';
import { IProspect } from './interfaces/prospect.interface';
import { AppApiService } from './services/app-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClient } from './interfaces/client.interface';
import { IUser } from './interfaces/user.interface';
import { BillingComponent } from './billing/billing.component';
import {MatAccordion} from '@angular/material/expansion';
import { BillingRegisterComponent } from './billing-register/billing-register.component';
import { CreditNoteRegisterComponent } from './credit-note-register/credit-note-register.component';
import { ConstructionBillingConfigurationComponent } from './construction-billing-configuration/construction-billing-configuration.component';
import { HistorialComponent } from './historial/historial.component';
import { RetencionesComponent } from './retenciones/retenciones.component';

const BILLING_DATA: Ibilling[] = [
  {billingNumber: 'FE450', date: '17/05/2023', construction: "", confirmation: "CF0010-19", utility: 874990, subtotal: 12031118, iva: 166248, total: 13072356, retentions: 386308, neto: 12686048, creditNote:true},
  {billingNumber: '', date: '', construction: "", confirmation: "", utility: 0, subtotal: 0, iva: 0, total: 0, retentions: 0, neto: 0, creditNote:false},
  {billingNumber: '', date: '', construction: "", confirmation: "", utility: 0, subtotal: 0, iva: 0, total: 0, retentions: 0, neto: 0, creditNote:false},
  {billingNumber: '', date: '', construction: "", confirmation: "", utility: 0, subtotal: 0, iva: 0, total: 0, retentions: 0, neto: 0, creditNote:false},
  {billingNumber: '', date: '', construction: "", confirmation: "", utility: 0, subtotal: 0, iva: 0, total: 0, retentions: 0, neto: 0, creditNote:false},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public loading = true;

  description: string= "Facturas";

  clientChoice: boolean = false;
  constructionChoice: boolean = false;
  habilitarFormCli: boolean = false;
  options:any[]=[];
  comboObras: IConstruction[] = [];
  clientSelCombo: any;
  prospect_get= new Prospect();
  id_client: number = -1;
  documents: any[] = [];
  client_sel = new Client();
  comboClients: IClient[] = [];
  construction_sel= new Construction();
  cmbRespo: IUser[] = [];

  c:any;

  emails: string[] = [];

  myControl = new FormControl();
  filterClients!: Observable<IClient[]>;

  prioriAlta: boolean = false;
  prioriMed: boolean = false;

  nom_client_aux: string="";
  //c: any;
  panelOpenState = false;

  dataSource = BILLING_DATA;
  constructionColumns: string[] = ['confirmation','billingNumber', 'utility', 'subtotal', 'iva', 'total', 'retentions', 'neto', 'settings'];
  constructor(
    private apiServer: TaskLeverCoreService,
    private api: AppApiService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    //@Inject(MAT_DIALOG_DATA) data : any,
  ) {
    console.log('****Get/Constructor****');
    this.getClients();

    this.cleanCliSel('L');
    this.prospect_get.tipo_cliente = 'N';
    this.CargarListClientesReg();

    //this.description = data.description;
    // this.item = data.item;
    // this.id_prospect = data.item.id;
    // this.prospect_get = data.item;
    // console.log(data, '--data--')

    // this.cargarListaCorreos(data.item.email_cliente);

    // if (data.item.id > 0) {
    //   this.cargarListaCorreosFact(data.item.email_fact);
    // }

    // this.CargarListaArticulos();
    // console.log(data);

    if (this.prospect_get.id > 0) {
      this.id_client = this.prospect_get.id_cliente;
      this.clientChoice = true;
      this.constructionChoice = true;
      this.loadProspect();
      this.cargarDocumentos(this.prospect_get.id_cliente);
    } else {
      console.log('****Nuevo Prospecto****');
      this.api.ObtenerConsecutivoProspecto()
        .subscribe((data: any) => {
          this.prospect_get.consecutivo = data.valor;
          this.prospect_get.pais_cliente = 'COLOMBIA';
          this.prospect_get.tipo_cliente = 'N';
        });
      this.prospect_get.id_obra = -1;
    }
  }

  ngOnInit() {
    console.log("this.clientChoice"+this.clientChoice);
    console.log(this.filterClients);

    this.filterClients = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre_completo),
        map(valor => valor ? this._filter(valor) : this.comboClients)
      );

      this.loading = false;
  }

  displayFn(client: any): string {
    console.log('Método displayFn');
    console.log(client);
    if (client) {
      this.id_client = client.id;
      console.log('id_client [displayFN]: ' + this.id_client);
      this.searchConstructions(this.id_client);
    } else {
      this.comboObras = [];
    }
    return client ? client.nombre_completo : client;
  }

  CargarListClientesReg() {

    const parametros = {
      id: 0,
      idEst: 'A'
    };

    this.api.ObtenerClientes(parametros.id, parametros.idEst)
      .subscribe((data: any) => {
        this.comboClients = data;
        console.log(this.comboClients);
      });
      console.log("linea 139");
    this.searchConstructions(this.prospect_get.id_cliente);

    this.api.ObtenerUsuarios('COMERCIAL-DISEÑO')
      .subscribe((data: any) => {
        this.cmbRespo = data;
      });
  }

  getClients=async()=>{
    this.options = await this.apiServer.getClientsWithConfirmations();
    console.log(this.options);
  }

  loadProspect() {
    if (this.prospect_get.prioridad == 'ALTA') {
      this.prioriAlta = true;
    } else if (this.prospect_get.prioridad == 'MEDIA') {
      this.prioriMed = true;
    }
  }

  clientCoincidence(coincidences: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Coincidencias',
      description: (`El nombre ` + this.clientSelCombo.toUpperCase() + `, tiene coincidencia con los siguientes nombres`),
      description2: '¿Está seguro de crear uno nuevo? O ¿desea continuar con uno existente?',
      coincidences
    }

    const dialogRef = this.dialog.open(ClientCoincidenceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log('clienteSeleccionado>>',data)
        if (data.cliente) {
          this.clientSelCombo = data.cliente
          await this.setIdAutocompleteC(data.cliente)
          this.cargar('c',1)
        } else {
          this.nuevo('c');
          this.clientChoice = true;
        }
      }
    );
  }

  billingConfigure(){
    //alert("billingConfigure");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '720px';
    dialogConfig.height = '600px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Registro Facturador',
    }

    const dialogRef = this.dialog.open(BillingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log("Registro facturador");
      }
    );

  }

  billingConstrucConfigure(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
     dialogConfig.width = '650px';
     dialogConfig.height= '900px';
     dialogConfig.panelClass = 'custom-modal';
     dialogConfig.data = {
       id: 1,
       title: 'Registro Facturador',
     }
     

     const dialogRef = this.dialog.open(ConstructionBillingConfigurationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
       async (data: { cliente: any; }) => {
         console.log("Registro facturacion");
       }
     );

  }
  setIdAutocompleteC(p: string) {
    console.log('setIdAutocomplete→');
    console.log(p);
    if (!p) {
      this.comboObras = [];
    }
  }

  esKeyCodeTilde = (par: any): boolean => (par == 225 || par == 233 || par == 237 || par == 243 || par == 250 || par == 252);
  esSignoPuntuacion = (par: any): boolean => (par == 46 || par == 44 || par == 58);

  preventSpecial(event: any, guion: boolean = false, interrog: boolean = false, soloNumeros: boolean = false, espacios: boolean = false, permiteTildes = false,
    permiteSignoPuntuacion = false) {
    const k = event.keyCode;
    console.log(k, 'k')
    if ((permiteSignoPuntuacion && !this.esSignoPuntuacion(k)) || !permiteSignoPuntuacion) {
      if ((permiteTildes && !this.esKeyCodeTilde(k)) || !permiteTildes) {
        if (k != 13) {
          if ((k != 63 && interrog) || (!interrog)) {
            if ((k != 45 && guion) || (!guion)) {
              if (!((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || (k == 241 || k == 209))) {
                event.preventDefault();
              }
            }
          }
        }
        var characters = String.fromCharCode(event.which);
        if ((!(/[0-9]/.test(characters))) && soloNumeros) {
          event.preventDefault();
        }
        if (k == 32 && !espacios) {
          event.preventDefault();
        }
      }
    }
  }

  cargar(tipo: string, item: any) {
    console.log('OnCargar→');

    if (tipo == 'c') {
      console.log(item);

      this.id_client = this.clientSelCombo.id;
      this.cargarDocumentos(this.clientSelCombo.id);
      console.log('this.idCliente→' + this.id_client);

      if (this.id_client === -1 || this.id_client == null) {
        this.snackBar.open('Debe seleccionar un cliente si desea cargarlo.', 'Error', {
          duration: 4000,
        });
        return;
      }

      this.client_sel = this.comboClients.find(x => x.id === this.id_client)!;
      console.log(this.client_sel);


      this.prospect_get.id_cliente = this.id_client;
      this.prospect_get.nit_cliente = this.client_sel.nit;
      this.prospect_get.tipo_cliente = this.client_sel.tipo_cliente;
      this.prospect_get.tipo_cliente_string = this.client_sel.tipo_cliente_string;
      this.prospect_get.tipo_documento_cliente = this.client_sel.tipo_documento;
      this.prospect_get.nombres_cliente = this.client_sel.nombres;
      this.prospect_get.nombre_completo_cliente = this.client_sel.nombre_completo;
      this.prospect_get.apellido_1_cliente = this.client_sel.apellido_1;
      this.prospect_get.apellido_2_cliente = this.client_sel.apellido_2;
      this.prospect_get.email_cliente = this.client_sel.email;
      this.prospect_get.telefono_1_cliente = this.client_sel.telefono_1;
      this.prospect_get.telefono_2_cliente = this.client_sel.telefono_2;
      this.prospect_get.pais_cliente = this.client_sel.pais;
      this.prospect_get.departamento_cliente = this.client_sel.departamento;
      this.prospect_get.ciudad_cliente = this.client_sel.ciudad;
      this.prospect_get.tipo_residencia_cliente = this.client_sel.tipo_residencia;
      this.prospect_get.localidad_cliente = this.client_sel.localidad;
      this.prospect_get.localidad_cliente_2 = this.client_sel.localidad_2;
      this.prospect_get.direccion_cliente = this.client_sel.direccion;
      this.prospect_get.punto_referencia_cliente = this.client_sel.punto_referencia;

      console.log(this.prospect_get.tipo_documento_cliente);
      console.log(this.prospect_get.pais_cliente);

      this.loadEmailsList(this.client_sel.email);
      this.habilitarFormCli = false;
      this.clientChoice = true;
      this.cleanConstructionSel('N');
      this.searchConstructions(this.id_client);
      this.prospect_get.id_obra = -1;
    } else {
      if (this.prospect_get.id_obra === -1) {
        this.snackBar.open('Debe seleccionar una obra si desea cargarla.', 'Información', {
          duration: 4000,
        });
        return;
      }
      console.log('id_obra:' + this.prospect_get.id_obra);

      this.construction_sel = this.comboObras.find(x => x.id === this.prospect_get.id_obra)!;
      console.log(this.construction_sel);

      this.prospect_get.nombre_obra = this.construction_sel.nombre;
      this.prospect_get.direccion_cliente_obra = this.construction_sel.direccion_cliente;
      this.prospect_get.requiere_siso = this.construction_sel.requiere_siso;
      this.prospect_get.pais_obra = this.construction_sel.pais;
      this.prospect_get.departamento_obra = this.construction_sel.departamento;
      this.prospect_get.ciudad_obra = this.construction_sel.ciudad;
      this.prospect_get.tipo_residencia_obra = this.construction_sel.tipo_residencia;
      this.prospect_get.localidad_obra = this.construction_sel.localidad;
      this.prospect_get.localidad_obra_2 = this.construction_sel.localidad;
      this.prospect_get.direccion_obra = this.construction_sel.direccion;
      this.prospect_get.punto_referencia_obra = this.construction_sel.punto_referencia;
      this.prospect_get.nombre_interesado = this.construction_sel.nombre_interesado;
      this.prospect_get.siso_nombre = this.construction_sel.siso_nombre;
      this.prospect_get.telefono_interesado = this.construction_sel.telefono_interesado;
      this.prospect_get.siso_telefono = this.construction_sel.siso_telefono;
      this.prospect_get.email_interesado = this.construction_sel.email_interesado;
      this.prospect_get.siso_correo = this.construction_sel.siso_correo;
      this.prospect_get.observaciones_obra = this.construction_sel.direccion;

      this.constructionChoice = true;
    }
  }

  nuevo(tipo: string) {
    console.log("function nuevo");
    //console.log('this.nom_cliente_aux' + this.nom_cliente_aux);

    // if (tipo == 'c') {
    //   this.id_cliente = 0;
    //   this.limpiarCliSel('N');
    //   try {
    //     this.prospecto_get.nombres_cliente = this.nom_cliente_aux;
    //     this.prospecto_get.nombres_cliente = this.prospecto_get.nombres_cliente.toUpperCase();
    //   } catch (e) {
    //   }

    // } else if (tipo == 'o') {
    //   this.prospecto_get.id_obra = 0;
    //   this.limpiarObraSel('N');
    //   try {
    //     this.prospecto_get.nombre_obra = this.nom_obra_aux;
    //     this.prospecto_get.nombre_obra = this.prospecto_get.nombre_obra.toUpperCase();
    //   } catch (e) {
    //   }
    // }
  }

  cargarDocumentos(id_client: number) {
    console.log('search...');
    if (id_client != undefined && id_client > 0) {
      this.api.ObtenerDocumentosCliente(id_client)
        .subscribe((data: any) => {
          this.documents = data;
        });
    }
  }

  loadEmailsList(emails: any) {
    console.log('cargarListaCorreos')
    this.emails = emails.split([';']).filter((val: string | null) => val != null && val != '');
  }

  private _filter(value: any): IClient[] {
    console.log('Metodo _filter:');
    console.log(value, 'value-Metodo _filter');
    this.nom_client_aux = value.toString().toUpperCase();
    return this.comboClients.filter(option => option.nombre_completo.replace(/\s/g, '').trim().toLowerCase().includes(value.toLowerCase().replace(/\s/g, '')));
    // return ((value == '' || value == undefined) ? this.comboClientes : (this.comboClientes.filter(c => c.nombre_completo.trim().toLowerCase().includes(value.trim().toLowerCase()))));
  }

  searchConstructions(id_client: number) {
    this.api.ObtenerObrasCliente(id_client)
      .subscribe((data: any) => {
        this.comboObras = data;
      });
  }

  cleanConstructionSel(modo: string) {
    console.log('Modo Limpiar Obra:' + modo);

    this.prospect_get.id_obra = (modo == 'N' ? 0 : -1);
    this.prospect_get.nombre_obra = '';
    this.prospect_get.direccion_cliente_obra = false;
    this.prospect_get.requiere_siso = false;
    this.prospect_get.pais_obra = 'COLOMBIA';
    this.prospect_get.departamento_obra = 'BOLÍVAR';
    this.prospect_get.ciudad_obra = 'CARTAGENA';
    this.prospect_get.tipo_residencia_obra = '';
    this.prospect_get.localidad_obra = '';
    this.prospect_get.localidad_obra_2 = '';
    this.prospect_get.direccion_obra = '';
  }

  cleanCliSel(modo: string) {
    console.log("modo>>>>>>"+modo)
    this.prospect_get.nombres_cliente = '';
    this.prospect_get.id_cliente = (modo === 'N' ? 0 : -1);
    this.id_client = -1;
    this.clientSelCombo = null;
    this.prospect_get.tipo_cliente = 'N';
    this.prospect_get.tipo_documento_cliente = '';
    this.prospect_get.nit_cliente = '';
    this.prospect_get.tipo_documento_cliente_string = '';
    this.prospect_get.nombres_cliente = '';
    this.prospect_get.nombre_completo_cliente = '';
    this.prospect_get.apellido_1_cliente = '';
    this.prospect_get.apellido_2_cliente = '';
    this.prospect_get.email_cliente = '';
    this.prospect_get.telefono_1_cliente = '';
    this.prospect_get.telefono_2_cliente = '';
    this.prospect_get.pais_cliente = 'COLOMBIA';
    this.prospect_get.departamento_cliente = 'BOLÍVAR';
    this.prospect_get.ciudad_cliente = 'CARTAGENA';
    this.prospect_get.tipo_residencia_cliente = '';
    this.prospect_get.localidad_cliente = '';
    this.prospect_get.localidad_cliente_2 = '';
    this.prospect_get.direccion_cliente = '';

    this.clientChoice = false;
    //this.client_sel = new Client();
    if(modo=='R'){
      this.getClients();
      this.CargarListClientesReg()
      this.ngOnInit();
    }
  }

  addNewClient = () => {
    const CoincidenceWithAnotherClient = this.verifyIfNamePartExist(this.clientSelCombo.toLowerCase())
    if (CoincidenceWithAnotherClient.length > 0) {
      this.clientCoincidence(CoincidenceWithAnotherClient)
    } else {
      this.nuevo('c');
      this.clientChoice = true;
    }
  }

  verifyIfNamePartExist(name: string) {
    const arrNameParts = name.split(' ')
    console.log('arrNameParts', arrNameParts)
    return this.comboClients.filter(cli => {
      return arrNameParts.some(namePart => (cli.nombres.toLowerCase().includes(namePart)))
    })
  }

  billing(confirmation: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.height = '300px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Registro Facturador',
    }

    const dialogRef = this.dialog.open(BillingRegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log("Registro facturador");
      }
    );
  }

  creditNote(confirmation: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.height = '300px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Registro Facturador',
    }

    const dialogRef = this.dialog.open(CreditNoteRegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log("Registro facturador");
      }
    );
  }

  history(confirmation: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.height = '300px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Historial',
    }

    const dialogRef = this.dialog.open(HistorialComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log("Historial");
      }
    );
  }

  retenciones(confirmation: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1400px';
    dialogConfig.height = '600px';
    dialogConfig.panelClass = 'custom-modal';
    dialogConfig.data = {
      id: 1,
      title: 'Retenciones',
    }

    const dialogRef = this.dialog.open(RetencionesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      async (data: { cliente: any; }) => {
        console.log("Retenciones");
      }
    );
  }

}




export class Client implements IClient {
  id: number = -1;
  tipo_cliente: string = 'N';
  nit: string = '';
  tipo_cliente_string: string = '';
  tipo_documento: string = '';
  nombres: string = '';
  nombre_completo: string = '';
  apellido_1: string = '';
  apellido_2: string = '';
  email: string = '';
  telefono_1: string = '';
  telefono_2: string = '';
  pais: string = 'COLOMBIA';
  departamento: string = 'BOLÍVAR';
  ciudad: string = 'CARTAGENA';
  estado: string = '';
  tipo_residencia: string = '';
  localidad: string = '';
  localidad_2: string = '';
  direccion: string = '';
  punto_referencia: string = '';
  fechalog: any = null;
  fechalog_string: string = '';
  id_usuario: number = 0;
  usuario: string = '';
  medio_enterado_cliente: string = '';

  constructor() {
  }
}

export class Prospect implements IProspect {
  id: number = 0;
  consecutivo: string = '000001';
  prioridad: string = '';
  responsable: number = 0;
  medio_contacto: string = '';
  observaciones: string = '';
  otro_articulo: string = '';
  nota: string = '';
  //Cliente
  id_cliente: number = 0;
  nit_cliente: string = '';
  tipo_cliente: string = 'N';
  tipo_cliente_string: string = '';
  tipo_documento_cliente: string = '';
  tipo_documento_cliente_string: string = '';
  nombres_cliente: string = '';
  nombre_completo_cliente: string = '';
  apellido_1_cliente: string = '';
  apellido_2_cliente: string = '';
  alias_cotizacion_cliente: string = '';
  email_cliente: string = '';
  telefono_1_cliente: string = '';
  telefono_2_cliente: string = '';
  pais_cliente: string = 'COLOMBIA';
  departamento_cliente: string = 'BOLÍVAR';
  ciudad_cliente: string = 'CARTAGENA';
  tipo_residencia_cliente: string = '';
  localidad_cliente: string = '';
  localidad_cliente_2: string = '';
  direccion_cliente: string = '';
  punto_referencia_cliente: string = '';
  medio_enterado_cliente: string = '';
  //Obra
  id_obra: number = 0;
  nombre_obra: string = '';
  direccion_cliente_obra: boolean = false;
  pais_obra: string = 'COLOMBIA';
  departamento_obra: string = 'BOLÍVAR';
  ciudad_obra: string = 'CARTAGENA';
  tipo_residencia_obra: string = '';
  localidad_obra: string = '';
  localidad_obra_2: string = '';
  direccion_obra: string = '';
  punto_referencia_obra: string = '';
  nombre_interesado: string = '';
  telefono_interesado: string = '';
  email_interesado: string = '';
  observaciones_obra: string = '';
  //Facturación
  razon_social_fact: string = '';
  tipo_documento_fact: string = '';
  tipo_documento_fact_string: string = '';
  nit_fact: string = '';
  telefono_fact: string = '';
  email_fact: string = '';
  tipo_residencia_fact: string = '';
  localidad_cliente_fact: string = '';
  direccion_fact: string = '';
  //SISO
  siso_nombre: string = '';
  siso_telefono: string = '';
  siso_correo: string = '';
  requiere_siso: boolean = false;

  fechalog: any = null;
  fechalog_string: string = '';
  id_usuario: number = 0;
  usuario: string = '';

  fecha_separador: any = null;

  constructor() {
  }
}

export class Construction implements IConstruction {
  id: number = -1;
  nombre: string = '';
  direccion_cliente: boolean = false;
  pais: string = 'COLOMBIA';
  departamento: string = 'BOLÍVAR';
  ciudad: string = 'CARTAGENA';
  estado: string = '';
  tipo_residencia: string = '';
  localidad: string = '';
  localidad_2: string = '';
  direccion: string = '';
  punto_referencia: string = '';
  nombre_interesado: string = '';
  telefono_interesado: string = '';
  email_interesado: string = '';
  observaciones: string = '';
  fechalog: any = null;
  fechalog_string: string = '';
  id_usuario: number = 0;
  usuario: string = '';

  //SISO
  siso_nombre: string = '';
  siso_telefono: string = '';
  siso_correo: string = '';
  requiere_siso: boolean = false;

  constructor() {
  }
}

export interface Ibilling {
  billingNumber: string;
  date: string;
  construction: string;
  confirmation: string;
  utility: number;
  subtotal: number;
  iva: number;
  total: number;
  retentions: number;
  neto: number;
  creditNote: boolean
}
