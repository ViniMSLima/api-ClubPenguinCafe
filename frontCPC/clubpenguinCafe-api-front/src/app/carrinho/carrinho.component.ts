import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { ShopListService } from '../services/shop-list.service';
import { Product } from '../model/Product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent implements OnInit {
  totalCompra: number = 0;

  atualizarCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  mais(id: number) {
    this.carrinho.forEach((element) => {
      if (element.id == id) element.quantidade++;
    });
    this.atualizarCarrinho();
    this.atualizarPreco();

  }

  menos(id: number) {
    this.carrinho.forEach((element) => {
      if (element.id == id && element.quantidade > 1) element.quantidade--;
    });
    this.atualizarCarrinho();
    this.atualizarPreco();

  }

  remover(item: Product) {
    this.carrinho = this.carrinho.filter(
      (itemCarrinho) => itemCarrinho != item
    );
    this.atualizarCarrinho();
    this.atualizarPreco();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  carrinho: Product[] = [];

  ngOnInit(): void {
    var carregarCarrinho = localStorage.getItem('carrinho');

    if (carregarCarrinho === null) {
      console.log("Can't edit an item from null");
      return;
    }

    this.carrinho = JSON.parse(carregarCarrinho);
    this.atualizarPreco();
  }

  atualizarPreco() {
    this.totalCompra = 0;
    this.carrinho.forEach((element) => {
      this.totalCompra += element.preco * element.quantidade;
    });

    this.totalCompra = parseFloat(this.totalCompra.toFixed(2));
  }

}
