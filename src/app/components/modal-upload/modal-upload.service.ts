import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  // recibir desde cualquier pagina el tipo (medico, hospital, usuario)
  public tipo: string;

  // Id del tipo
  public id: string;

  // Para saber si esta oculto o no el modal
  public oculto: string = 'oculto';

  // Emitir algo para que los otros componentes que utilicen modal puedan subscribirse, para notificar que ya se subio otra imagen
  public notificacion = new EventEmitter<any>();



  constructor() {
    // console.log('Modal Service Listo...');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
