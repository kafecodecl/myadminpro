import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { CLIENT_ID_GAPI } from '../config/config';

declare function init_plugins();
declare const gapi: any; // le digo a tyscript que existe una libreria llamada gapi y esta referenciada en el index

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any; // el objeto que me devolverá google

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.googleInit();
    init_plugins();

    this.email = localStorage.getItem('email') || '';

  }

  // ***********************************************************************/
  // función para la inicialización del plugin google signin
  // ***********************************************************************/
  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID_GAPI,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      // hago un attach del boton de google de la pantalla
      this.attachSignin(document.getElementById('btnGoogle'));

    });

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      // console.log(profile);
      // console.log('TOKEN: ', token);

      this._usuarioService.loginGoogle(token)
        .subscribe( resp => window.location.href = '#/dashboard' );

    });
  }

  ingresar(forma: NgForm) {

    // valido si el formulario es válido
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => window.location.href = '#/dashboard' );
  }

}
