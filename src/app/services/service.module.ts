import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          HospitalService,
          MedicoService,
          LoginGuardGuard,
          ModalUploadService,
          SubirArchivoService
        } from './services.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService,
    LoginGuardGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
