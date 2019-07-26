import { Component, OnInit } from '@angular/core';

// Me permite llamar pluggins que estan fuera de angular 
declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Inicializar todos los pluggins
    init_plugins();
  }

}
