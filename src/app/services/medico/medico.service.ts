import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public httpClient: HttpClient,
    // tslint:disable-next-line: variable-name
    private _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';
    return this.httpClient.get( url )
    .pipe(
      map( (resp: any) => {

        // console.log('Medicos from service: ', resp);
        this.totalMedicos = resp.conteo;
        return resp.medicos;
      })
    );

  }

  busquedaMedicos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.httpClient.get( url )
              .pipe(
                map( (resp: any) => resp.medico)
              );
  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    // console.log(url);
    return this.httpClient
      .delete(url)
      .pipe(
        map(resp => {
          // console.log(resp);
          swal('Médico Borrado.', 'Eliminado correctamente', 'success');
        }
        )
      );
  }
}
