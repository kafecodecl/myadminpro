import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number = 0;

  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {

        this.totalRegistro = resp.total;
        this.usuarios = resp.usuarios;

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

}
