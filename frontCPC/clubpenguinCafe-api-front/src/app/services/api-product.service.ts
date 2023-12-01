import { Injectable } from '@angular/core';
import { ClientData } from '../model/client-data';
import { ApiClientService } from './api-client.service';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: ApiClientService) { }

  register(data: Product)
  {
    this.http.post('product/register', data)
      .subscribe(response => console.log(response))
  }

//   initItems() {    
//     let dadosIniciais: Product[] = [
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doudce', preco: 124.00 },
//       { nome: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doudce', preco: 124.00 },
//       { nome: 'juxhfgissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//       { nome: 'burgae', descricao: 'doce', preco: 12.00 },
//       { nome: 'juissa', descricao: 'doce', preco: 12.00 },
//       { nome: 'sus', descricao: 'doce', preco: 12.00 },
//     ];

//     localStorage.setItem('list', JSON.stringify(dadosIniciais));
//   }
}
