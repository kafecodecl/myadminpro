import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó.')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;


      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Auxilio!!!' );
        // }

      }, 1000);

    })
    .pipe(
      map( resp => resp.valor ),
      filter( (value, index) => {
        // console.log('Filter', value, index)
        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );

  }

}
