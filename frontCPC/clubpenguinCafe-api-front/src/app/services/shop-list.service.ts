import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from './api-product.service';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root',
})
export class ShopListService 
{

  carrinho: Product[] = [];

  initCarrinho() {
    let carrinhoInicial: Product[] = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinhoInicial));
  }

  addCarrinho(produto: Product)
  {
    this.carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  getCarrinho()
  {
    var storedCarrinho = localStorage.getItem('carrinho');

    if(storedCarrinho === null)
      return null

    let data = JSON.parse(storedCarrinho);
    return data;

  }

  updateCarrinho(carrinho: Product[]) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  updateList(list: Product[]) {
    localStorage.setItem('list', JSON.stringify(list));
  }
  
  getPrecoByName(Name: string): number {
    var list = localStorage.getItem('list');

    if (list === null) {
      return 0;
    }

    let preco: number = 0;

    let data: Product[] = JSON.parse(list);
    data.forEach((element) => {
      if (element.nome == Name) preco = element.preco;
    });

    return preco;
  }

  constructor(private http: ApiClientService) { }

  initItems()
  {
    var product = this.http.get("product");
    return product;
  }

  getPromocoes()
  {
    var promo = this.http.get("promo");
    return promo;
  }

  // getItems() {
  //   var storedData = localStorage.getItem('list');
  //   if (storedData === null) return null;

  //   let data = JSON.parse(storedData);
  //   return data;
  // }
}
