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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  list: any = [];
  list1: any = [];
  list2: any = [];

  onClickProdutos() {
    this.list = this.list1;
  }

  onClickPromocoes() {
    this.list = this.list2;
  }

  ngOnInit(): void {
    this.service.initItems().subscribe((data: any) => {
      this.list1 = [];
      data.forEach((x: any) => this.list1.push(x));
      this.list = this.list1;
    });

    this.service.getPromocoes().subscribe((data: any) => {
      this.list2 = [];
      data.forEach((x: any) => this.list2.push(x));
    });

    
  }
}
