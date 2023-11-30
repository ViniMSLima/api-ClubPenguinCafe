import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';

@Component({
  selector: 'app-tela-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-cliente.component.html',
  styleUrl: './tela-cliente.component.css',
})
export class TelaClienteComponent implements OnInit {
  onClickPromocoes() {
    throw new Error('Method not implemented.');
  }
  onClickProdutos() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
    ) {}
    
    list2: any = [];
  ngOnInit(): void {
    this.service.initItems().subscribe( (data:any) => {
      this.list2 = []
      data.a.forEach((x:any) => this.list2.push(x))
    });
  }

}
