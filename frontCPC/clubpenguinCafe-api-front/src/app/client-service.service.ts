import { Injectable } from '@angular/core';
import { ClientData } from './client-data';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  constructor(private http: ApiClientService) { }

  register(data: ClientData)
  {
    this.http.post('user/register', data)
      .subscribe(response => console.log(response))
  }

  login(data: ClientData, callback: any)
  {
    this.http.post('user/login', data)
      .subscribe(
        response => {
          callback(response)
        },
        error => { 
          callback(null)
        })
  }
}