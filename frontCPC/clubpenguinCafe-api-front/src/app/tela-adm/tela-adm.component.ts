import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { MatDialog } from '@angular/material/dialog';
import { NewAdmDialog } from '../login/login.component';

@Component({
  selector: 'app-tela-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-adm.component.html',
  styleUrl: './tela-adm.component.css',
})
export class TelaAdmComponent implements OnInit {
  registrar()
  {
    this.dialog.open(NewAdmDialog);
  }
  onClickPromocoes() {
    throw new Error('Method not implemented.');
  }
  onClickProdutos() {
    throw new Error('Method not implemented.');
  }
  list: Product[] = [];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  ngOnInit(): void {
    this.service.initItems();
    this.list = this.service.getItems();
  }

  produto = '';
  descricao = '';
  preco = 0;
}
