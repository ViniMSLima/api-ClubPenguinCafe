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

@Component({
  selector: 'app-tela-adm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-adm.component.html',
  styleUrl: './tela-adm.component.css',
})
export class TelaAdmComponent implements OnInit {
addProduto() {
  this.dialog.open(NewProductDialog);
}
    
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

 

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopListService
  ) {}

  ngOnInit(): void {
    

  }

  produto = '';
  descricao = '';
  preco = 0;
}


@Component({
  selector: 'app-new-product-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule,
    MatButtonModule, MatFormFieldModule, FormsModule, MatSlideToggleModule ],
  templateUrl: './new-product-dialog.component.html',
  styleUrl: './tela-adm.component.css'
})
export class NewProductDialog
{
  nome: string = ""
  descricao: string = ""
  preco: number = 0

  constructor(public dialogRef: MatDialogRef<NewProductDialog>,
    private client: ProductService
    ) {}

  create()
  {
    this.client.register({
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      id: 0,
      imagem: ''
    })

    this.dialogRef.close()
  }
}
