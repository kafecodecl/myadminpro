import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/services.index';
import { Title } from '@angular/platform-browser';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;

  desde: number = 0; // para el pagnador
  totalRegistro: number = 0;

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalServices: HospitalService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this._hospitalServices.cargarHospitales(this.desde)
      .subscribe( (hospitales: any) => {

        this.totalRegistro = this._hospitalServices.totalHospitales;
        this.hospitales = hospitales;
      });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalServices.busquedaHospitales( termino )
          .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;
            this.cargando = false;

          });
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalServices.actualizarHospital( hospital )
    .subscribe();

  }

  borrarHospital( hospital: Hospital ) {
    swal({
      title: '¿Está Seguro?',
      text: 'Está a punto de eliminar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {

        this._hospitalServices.borrarHospital( hospital._id )
              .subscribe( () => this.cargarHospitales() );

      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalServices.crearHospital( valor )
        .subscribe( () => {
          this.cargarHospitales();
        });

    });
  }

  actualizarImagen( hospital: Hospital ) {

    // console.log('actualizarImagen: ', hospital);
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

  // Paginador
  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    // console.log('Desde Nuevo', desde, this.desde);

    if ( desde >= this.totalRegistro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

}
