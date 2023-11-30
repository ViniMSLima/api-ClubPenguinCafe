import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-totem',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent],
  templateUrl: './totem.component.html',
  styleUrl: './totem.component.css',
})
export class TotemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  carrinho: Product[] = [];

  addProdutoCarrinho(item: Product)
  {
    this.carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));

    console.log(this.carrinho);
  }

  list2: any = [];
  
  ngOnInit(): void {
    
    this.service.initItems().subscribe((data: any) => {
      this.list2 = [];
      data.a.forEach((x: any) => this.list2.push(x));
    });
    console.log(this.carrinho);

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

  produto = '';
  descricao = '';
  preco = 0;
  id: number = 0;
  imagem: string = '';
}
