import { Injectable } from '@angular/core';
import { ClientData } from '../model/client-data';
import { ApiClientService } from './api-client.service';
import { Product } from '../model/Product';
import { Cupom } from '../model/Cupom';

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  constructor(private http: ApiClientService) { }

  register(data: Cupom)
  {
    this.http.post('cupom/register', data)
      .subscribe(response => console.log(response))
  }

  getDesconto(codigo: Cupom) {
    return this.http.postObj("cupom/getdesconto", codigo);
  }
}
