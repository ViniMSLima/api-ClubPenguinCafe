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

  addProdutoCarrinho(item: any) {
    var a = 0;

    this.carrinho.forEach((element) => {
      if (element.nome == item.nome) {
        element.quantidade++;
        a++;
      }
    });

    var precoPromocao = item.preco;

    this.promocoes.forEach((promocao: any) => {
      if (promocao.nome == item.nome) {
        precoPromocao = promocao.preco;
      }
    });

    if (a == 0)
      this.carrinho.push({
        id: item.id,
        imagem: 'null',
        quantidade: 1,
        nome: item.nome,
        preco: precoPromocao,
        descricao: item.descricao,
      });

    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  list: any = [];
  produtos: any = [];
  promocoes: any = [];

  onClickProdutos() {
    this.list = this.produtos;
  }

  onClickPromocoes() {
    this.list = this.promocoes;
  }

  ngOnInit(): void {
    this.service.initItems().subscribe((data: any) => {
      this.produtos = [];
      data.forEach((x: any) => this.produtos.push(x));
      this.list = this.produtos;
    });

    this.service.getPromocoes().subscribe((data: any) => {
      this.promocoes = [];
      data.forEach((x: any) => this.promocoes.push(x));
    });

    var carregarCarrinho = localStorage.getItem('carrinho');

    if (carregarCarrinho === null) {
      console.log("Can't edit an item from null");
      return;
    }

    this.carrinho = JSON.parse(carregarCarrinho);
  }
}
