import { Injectable } from '@angular/core';
import { ClientData } from '../model/client-data';
import { ApiClientService } from './api-client.service';
import { Promo } from '../model/Promo';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  constructor(private http: ApiClientService) { }

  register(data: Promo)
  {
    this.http.post('promo/register', data)
      .subscribe(response => alert(response))
  }
}
