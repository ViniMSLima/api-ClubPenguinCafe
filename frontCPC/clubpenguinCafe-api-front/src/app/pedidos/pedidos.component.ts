import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {

  Finalizar(obj: number) {
    this.service.pedidoPronto(obj);
    this.carregarLista();
    // window.location.reload();
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
      this.listNaoProntos = this.list.filter((item: any) => item.pronto == false);
      this.pedidosRestantes = this.listNaoProntos.length;
    });
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.carregarLista();
    }, 1000);
  }
}
