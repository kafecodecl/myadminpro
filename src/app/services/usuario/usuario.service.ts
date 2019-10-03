import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { retry, map, filter } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;


  }

  // ***********************************************************************/
  // Logout
  // ***********************************************************************/
  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  // ***********************************************************************/
  // Login Google
  // ***********************************************************************/
  loginGoogle( token: string ) {

    // llamo al servicio login/google
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token })
          .pipe(
            map( (resp: any) => {
              this.guardarStorage(resp.id, resp.token, resp.usuario);
              return true;
            })
          );



  }

  // ***********************************************************************/
  // Login Normal
  // ***********************************************************************/
  login( usuario: Usuario, recordar: boolean = false ) {

    // funcion recordar
    if ( recordar ) {
      localStorage.setItem( 'email',  usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
        .pipe(
          map( (resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario );

            return true;
          })
        );

  }


  // ***********************************************************************/
  // Crear Usuario, utilizado por la página del registro
  // ***********************************************************************/
  crearUsuario( usuario: Usuario ) {

    // Se crea una constante con la ruta del servicio, se obtiene la ruta base del archivo de configuración (config/config.ts)
    const url = URL_SERVICIOS + '/usuario';

    // Hago la llamada http por post, retornando un observable al cual me puedo suscribir
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado ', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }


  // ***********************************************************************/
  // Actualizar Usuario
  // ***********************************************************************/
  actualizarUsuario( usuario: Usuario ) {

    // Se crea una constante con la ruta del servicio, se obtiene la ruta base del archivo de configuración (config/config.ts)
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    // Hago la llamada http por post, retornando un observable al cual me puedo suscribir
    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {

        if ( usuario._id === this.usuario._id ) {
          const usuarioDB  = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }



        swal('Usuario Actualizado ', usuario.email, 'success');
        return true;
      })
    );
  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
        .then( (resp: any) => {
          console.log(resp);
          this.usuario.img = resp.usuarioActualizado.img;
          swal('Imagen de Usuario Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch( resp => {
            console.log(resp);
        });

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  busquedaUsuarios( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

    return this.http.get( url )
              .pipe(
                map( (resp: any) => resp.usuario)
              );
  }

  borrarUsuario( id: string ) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete( url )
              .pipe(
                map( (resp: any) => {
                  swal('Usuario borrado', 'El usuario ha sido eliminado con éxito.', 'success');
                  return true;
                })
              );
  }

}