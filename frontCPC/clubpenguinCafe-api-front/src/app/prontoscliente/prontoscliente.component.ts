import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prontoscliente.component.html',
  styleUrl: './prontoscliente.component.css',
})
export class ProntosClienteComponent implements OnInit {

  Entregar(obj: number) {
    this.service.pedidoEntregue(obj);
    this.carregarLista();
  }
  constructor(
    private service: ShopListService
  ) {}

  list: any = [];
  listNaoProntos: any = [];
  pedidosRestantes: number = 0;

  carregarLista(): void {
    this.service.getPedidos().subscribe((data: any) => {
      this.list = [];
      data.forEach((x: any) => this.list.push(x));
      this.list = this.list;
      this.listNaoProntos = this.list.filter((item: any) => item.pronto == true && item.entregue == false);
      this.pedidosRestantes = this.listNaoProntos.length;
    });
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.carregarLista();
    }, 200);
  }
}
