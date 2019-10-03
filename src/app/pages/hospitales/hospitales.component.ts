import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/services.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalServices: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalServices.cargarHospitales()
      .subscribe( (hospitales: any) => {
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

  guardarHospital( hospital: Hospital ) {}

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

}
