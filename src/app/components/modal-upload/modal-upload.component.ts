import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string = '';

  imagenSubir: File;
  imagenTemp: string;


  constructor(
    public _subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
  }

  subirImagen() {
    console.log('SUBIR IMAGEN DESDE MODAL');
  }


  seleccioinImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal('Solo Imagen', 'El tipo de archivo seleccionado debe ser una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

    console.log( archivo );

  }

}
