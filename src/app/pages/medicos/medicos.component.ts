import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/services.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalRegistro: number = 0;
  medicos: Medico[] = [];
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {

    this._medicoService.cargarMedicos()
        .subscribe( medicos => {
          this.medicos = medicos;
        });

  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.busquedaMedicos( termino )
          .subscribe( (medicos: Medico[]) => {

            this.medicos = medicos;
            this.cargando = false;

          });

  }

  crearMedico() {}

  editarMedico( medico: Medico ) {}

  borrarMedico( medico: Medico ) {
    swal({
      title: '¿Está Seguro?',
      text: 'Está a punto de eliminar el médico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {

        this._medicoService.borrarMedico( medico._id )
              .subscribe( () => this.cargarMedicos() );

      }
    });
  }

  cambiarDesde( valor: number ) {}

  actualizarImagen( medico: any) {}

}
