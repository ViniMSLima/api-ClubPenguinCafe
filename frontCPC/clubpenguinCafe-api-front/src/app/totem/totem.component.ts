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
    var a = 0;

    this.carrinho.forEach(element => {
      if(element.nome == item.nome)
      {
        element.quantidade++;
        a++;
      }
    });

    if(a == 0)
      this.carrinho.push(item);

    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  list2: any = [];
  
  ngOnInit(): void {
    
    this.service.initItems().subscribe((data: any) => {
      this.list2 = [];
      data.a.forEach((x: any) => this.list2.push(x));
    });

    var carregarCarrinho = localStorage.getItem('carrinho');

    if (carregarCarrinho === null) 
    {
      console.log("Can't edit an item from null");
      return;
    }
    
    this.carrinho = JSON.parse(carregarCarrinho);
  }

  produto = '';
  descricao = '';
  preco = 0;
  id: number = 0;
  imagem: string = '';
}
