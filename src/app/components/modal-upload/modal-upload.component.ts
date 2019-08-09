import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';

  imagenSubir: File;
  imagenTemp: string;


  constructor(
    public _modalUploadService: ModalUploadService,
    public _subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {

    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }



  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagen', 'El tipo de archivo seleccionado debe ser una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

    console.log(archivo);

  }

  subirImagen() {

    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {

        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        this.imagenSubir = null;
        this.imagenTemp = null;
        this.cerrarModal();

      })
      .catch(err => {
        console.log('Error al subir imagen.', err);
      });

  }

}
