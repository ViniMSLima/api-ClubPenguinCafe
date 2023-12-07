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
    this.http.post('produto/register', data)
      .subscribe(response => console.log(response))
  }

}
