import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../../models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


  lista: Lista;
  nombreItem: string;

  constructor(private router: ActivatedRoute,
      private deseosService: DeseosService) {

      const listaId = this.router.snapshot.paramMap.get('listaId');
      this.lista = this.deseosService.obtenerLista(listaId);

            }

  ngOnInit() {
  }

  agregarItem() {

    if (this.nombreItem.length === 0 ){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';

    this.deseosService.guardarStorage();

  }

  cambioCheck(item: ListaItem ) {

    const pendientes = this.lista.items.filter( itemData => {
      return !itemData.completado;
    }).length;

    if (pendientes === 0 ){
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }
    this.deseosService.guardarStorage();
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);

    this.deseosService.guardarStorage();
  }

}
