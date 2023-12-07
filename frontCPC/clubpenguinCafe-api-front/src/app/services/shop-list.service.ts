import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from './api-product.service';
import { ApiClientService } from './api-client.service';
import { TipoEspecial } from '../model/tipo-especial';

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
    var product = this.http.get("produto");
    return product;
  }

  getPromocoes()
  {
    var promo = this.http.get("promo");
    return promo;
  }

  getCupons()
  {
    var cupom = this.http.get("cupom");
    return cupom;
  }

  getPedidos() {
    var pedidos = this.http.get("pedido");
    return pedidos;
  }

  getGrafico1x() {
    var grafico1 = this.http.get("pedido/grafico1x");
    return grafico1;
  }

  getGrafico1y() {
    var grafico1 = this.http.get("pedido/grafico1y");
    return grafico1;
  }

  getGrafico2x() {
    var grafico1 = this.http.get("pedido/grafico2x");
    return grafico1;
  }

  getGrafico2y() {
    var grafico1 = this.http.get("pedido/grafico2y");
    return grafico1;
  }

  addPedido(obj: TipoEspecial[])
  {
    this.http.post("pedido/register", obj).subscribe(response => alert("PEDIDO REALIZADO!"));
  }

  pedidoPronto(obj: number)
  {
    this.http.post("pedido/pronto", obj).subscribe(response => console.log("PEDIDO PRONTO!"));
  }

  pedidoEntregue(obj: number)
  {
    this.http.post("pedido/entregue", obj).subscribe(response => console.log("PEDIDO ENTREGUE!"));
  }

}
