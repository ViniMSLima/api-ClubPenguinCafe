import { Component, OnInit, booleanAttribute } from '@angular/core';
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
  list3: any = [];

  booleano: boolean = false;

  onClickProdutos() {
    this.list = this.list1;
    this.booleano = false;
  }

  onClickPromocoes() {
    this.list = this.list2;
    this.booleano = false;
  }

  onClickCupons() {
    this.list = this.list3;
    this.booleano = true;
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

    this.service.getCupons().subscribe((data: any) => {
      this.list3 = [];
      data.forEach((x: any) => this.list3.push(x));
    });
  }
}
