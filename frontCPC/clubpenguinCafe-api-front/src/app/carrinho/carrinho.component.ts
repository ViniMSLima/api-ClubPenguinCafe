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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}
  
  carrinho: Product[] = [{descricao: "suco", produto: "amora", preco: 221}];

  ngOnInit(): void {
    this.service.initCarrinho();
    this.carrinho = this.service.getCarrinho();
  }
}
