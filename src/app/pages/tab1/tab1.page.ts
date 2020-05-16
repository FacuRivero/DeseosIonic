import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: Lista[];

  constructor(private deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {
  }

  async agregarLista() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          },
        },
        {
          text: 'Crear',
          handler: (data: any) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            const listaId = this.deseosService.craerLista(data.titulo);
            this.router.navigate(['/tabs/tab1/agregar/', listaId]);
          }
        }
      ]
    });

    alert.present();

  }



}
