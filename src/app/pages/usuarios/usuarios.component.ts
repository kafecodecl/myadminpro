import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/services.index';


declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  cargando: boolean = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {

        this.totalRegistro = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

      });

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    // console.log('Desde Nuevo', desde, this.desde);

    if ( desde >= this.totalRegistro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.busquedaUsuarios( termino )
          .subscribe( (usuarios: Usuario[]) => {

            this.usuarios = usuarios;
            this.cargando = false;

          });

  }


  borrarusuario( usuario: Usuario ) {

    // this._usuarioService.usuario._id es el usuario logueado y no deberia poder borrarse
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está Seguro?',
      text: 'Está a punto de eliminar al usuario ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      console.log(borrar);

      if (borrar) {

        this._usuarioService.borrarUsuario( usuario._id )
              .subscribe( borrado => {
                console.log(borrado);
                this.cargarUsuarios();
              });

      }
    });

  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();
  }

}
