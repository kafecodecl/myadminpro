import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  ajustes: IAjustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {

    const url = `assets/css/colors/${ tema }.css`;
    document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

interface IAjustes {
  temaUrl: string;
  tema: string;
}
