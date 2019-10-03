import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public httpClient: HttpClient,
    // tslint:disable-next-line: variable-name
    private _usuarioService: UsuarioService
  ) {}

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';

    return this.httpClient.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHopital(id: string) {
    const url = URL_SERVICIOS + '/hopital/' + id;

    return this.httpClient.get(url).pipe(map((resp: any) => resp.hopital));
  }

  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.httpClient
      .delete(url)
      .pipe(
        map(resp => {
          // console.log(resp);
          swal('Hopital Borrado.', 'Eliminado correctamente', 'success');
        }
        )
      );
  }

  crearHopital(nombre: string) {
    let url = URL_SERVICIOS + '/hopital';

    url += '?token=' + this._usuarioService.token;

    return this.httpClient
      .post(url, { nombre })
      .pipe(map((resp: any) => resp.hospital));
  }

  busquedaHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.httpClient.get(url).pipe(map((resp: any) => resp.hospital));
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hopital/' + hospital._id;

    url += '?token=' + this._usuarioService.token;

    return this.httpClient.put( url, hospital ).pipe(
      map( (resp: any) => resp.hospital )
    );

  }
}
