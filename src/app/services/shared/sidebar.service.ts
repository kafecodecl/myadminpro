import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Rxjs', url: '/rxjs' },
  //       { titulo: 'Promesas', url: '/promesas' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Medicos', url: '/medicos' }
  //     ]
  //   }
  // ];

  constructor(
    public _usuarioServices: UsuarioService
  ) {
  }

  cargarMenu() {
    this.menu = this._usuarioServices.menu;
  }
}
