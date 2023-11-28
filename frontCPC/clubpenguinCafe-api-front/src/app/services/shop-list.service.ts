import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

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
      if (element.produto == produto)
      {
        element.produto = newProduto;
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
      if (element.produto == Name) preco = element.preco;
    });

    return preco;
  }

  constructor() {}

  initItems() {
    var storedData = localStorage.getItem('list');
    // if (storedData !== null) return;

    let dadosIniciais: Product[] = [
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doudce', preco: 124.00 },
      { produto: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doudce', preco: 124.00 },
      { produto: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
      { produto: 'burgae', descricao: 'doce', preco: 12.00 },
      { produto: 'juissa', descricao: 'doce', preco: 12.00 },
      { produto: 'sus', descricao: 'doce', preco: 12.00 },
    ];

    localStorage.setItem('list', JSON.stringify(dadosIniciais));
  }

  getItems() {
    var storedData = localStorage.getItem('list');
    if (storedData === null) return null;

    let data = JSON.parse(storedData);
    return data;
  }
}
