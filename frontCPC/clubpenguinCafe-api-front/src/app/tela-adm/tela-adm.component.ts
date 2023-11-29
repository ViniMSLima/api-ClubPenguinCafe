import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewAdmDialog } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { ClientServiceService } from '../services/client-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../services/api-product.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tela-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-adm.component.html',
  styleUrl: './tela-adm.component.css',
})
export class TelaAdmComponent {
  addProduto() {
    this.dialog.open(NewProductDialog);
  }

  addPromo() {
    this.dialog.open(NewPromoDialog);
  }

  registrar() {
    this.dialog.open(NewAdmDialog);
  }

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  produto = '';
  descricao = '';
  preco = 0;
}

@Component({
  selector: 'app-new-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  templateUrl: './new-product-dialog.component.html',
  styleUrl: './tela-adm.component.css',
})
export class NewProductDialog {
  nome: string = '';
  descricao: string = '';
  preco: number = 0;

  constructor(
    public dialogRef: MatDialogRef<NewProductDialog>,
    private client: ProductService
  ) {}

  create() {
    this.client.register({
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      id: 0,
      imagem: '',
    });

    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-new-promo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  templateUrl: './new-promo-dialog.component.html',
  styleUrl: './tela-adm.component.css',
})
export class NewPromoDialog implements OnInit {
  nome: string = '';
  descricao: string = '';
  preco: number = 0;

  constructor(
    public dialogRef: MatDialogRef<NewPromoDialog>,
    private client: ProductService,
    private service: ShopListService
  ) {}
  list: any;
  list2: any = [];
  ngOnInit(): void {
    this.service.initItems().subscribe((data: any) => {
      this.list2 = [];
      data.a.forEach((x: any) => this.list2.push(x));
    });
  }

  create() {
    this.client.register({
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      id: 0,
      imagem: '',
    });

    this.dialogRef.close();
  }
}
