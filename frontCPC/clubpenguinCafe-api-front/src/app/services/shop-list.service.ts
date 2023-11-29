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

  EditItem(produto: string, newProduto: string, descricao: string) 
  {
    var list = localStorage.getItem('list');

    if (list === null) 
    {
      console.log("Can't edit an item from null");
      return;
    }

    let data: Product[] = JSON.parse(list);
    data.forEach((element) => {
      if (element.nome == produto)
      {
        element.nome = newProduto;
        element.descricao = descricao;
      }
    });

    localStorage.setItem('list', JSON.stringify(data));
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
    return this.http.get("product")
  }

  teste() {
    var storedData = localStorage.getItem('list');
    // if (storedData !== null) return;
    

  //   let dadosIniciais: Product[] = [
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doudce', preco: 124.00 },
  //     { nome: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doudce', preco: 124.00 },
  //     { nome: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //     { nome: 'burgae', descricao: 'doce', preco: 12.00 },
  //     { nome: 'juissa', descricao: 'doce', preco: 12.00 },
  //     { nome: 'sus', descricao: 'doce', preco: 12.00 },
  //   ];

  //   localStorage.setItem('list', JSON.stringify(dadosIniciais));
  }

  getItems() {
    var storedData = localStorage.getItem('list');
    if (storedData === null) return null;

    let data = JSON.parse(storedData);
    return data;
  }
}
