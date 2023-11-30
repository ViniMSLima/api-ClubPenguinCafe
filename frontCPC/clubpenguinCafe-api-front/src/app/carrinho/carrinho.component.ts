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
  imports: [
    CommonModule,
    FooterComponent,
    NavComponent
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  remover(item: Product) {
    this.carrinho = this.carrinho.filter((itemCarrinho) => itemCarrinho != item);
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}
  
  carrinho : Product[] = [];

  atualizarCarrinho(): void {

  }

  ngOnInit(): void {
    
    var carregarCarrinho = localStorage.getItem('carrinho');

    if (carregarCarrinho === null) 
    {
      console.log("Can't edit an item from null");
      return;
    }
    
    console.log("carrinho carregado");
    this.carrinho = JSON.parse(carregarCarrinho);
    console.log(this.carrinho);

  }
}
