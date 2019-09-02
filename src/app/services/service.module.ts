import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          HospitalService,
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
    SubirArchivoService,
    ModalUploadService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
