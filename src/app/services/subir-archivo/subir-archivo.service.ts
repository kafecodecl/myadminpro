import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        // Solo interesa el estado 4, cuando termina el proceso
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log('Imagen subida');
            resolve( JSON.parse(xhr.response) );
          } else {
            // console.log('Error al sunir imagen');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });



  }
}
