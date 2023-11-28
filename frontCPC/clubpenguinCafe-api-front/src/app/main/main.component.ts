// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
// import { ShopListService } from '../services/shop-list.service';
// import { Product } from '../model/Product';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { FormsModule } from '@angular/forms';
// import { LoginComponent } from '../login/login.component';
// import { PedidosComponent } from '../pedidos/pedidos.component';
// import { TotemComponent } from '../totem/totem.component';
// import { CarrinhoComponent } from '../carrinho/carrinho.component';

// @Component({
//   selector: 'app-main',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterOutlet,
//     MatCheckboxModule,
//     FormsModule,
//     LoginComponent,
//     PedidosComponent,
//     TotemComponent,
//     CarrinhoComponent
//   ],
//   templateUrl: './main.component.html',
//   styleUrl: './main.component.css',
// })
// export class MainComponent implements OnInit {
//   list: Product[] = [];
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private service: ShopListService
//   ) {}

//   changeCheckbox() {
//     this.service.updateList(this.list);
//     this.router.navigate(['']);
//   }

//   ngOnInit(): void {
//     this.service.initItems();
//     this.list = this.service.getItems();
//   }

//   editItem(item: Product) {
//     this.router.navigate(['edit', item.produto]);
//   }

//   savedText = '';
//   text = '';

//   update(event: any) {
//     this.savedText = event.target.value;
//   }

//   produto = '';
//   quantidade = 0;

//   SaveQuantidade(event: any) {
//     this.quantidade = event.target.value;
//   }

//   SaveProduto(event: any) {
//     this.produto = event.target.value;
//   }

//   AddProduto() {
//     var added = false;
//     this.list.map((it) => {
//       if (it.produto == this.produto) {
//         it.quantidade = Number(this.quantidade) + Number(it.quantidade);
//         added = true;
//       }
//     });

//     if (!added) {
//       this.list.push({
//         produto: this.produto,
//         quantidade: this.quantidade,
//         comprado: false,
//       });
//     }

//     this.service.updateList(this.list);
//   }

//   deleteItem(event: any, product: string) {
//     this.list.map((it) => {
//       if (it.produto == product) {
//         this.list = this.list.filter((item) => item.produto != product);
//         console.log('deleted item: ', it.produto);
//       }
//     });

//     this.service.updateList(this.list);
//   }

//   naoMostrarComprados = true;

//   showComprados(event: any) {
//     this.naoMostrarComprados = event.target.checked;
//   }

//   markCheckbox(event: any, produto: string) {
//     console.log(produto);
//     console.info(event.target.checked);

//     this.list.map((it) => {
//       if (it.produto == produto) {
//         it.comprado = event.target.checked;
//       }
//     });
//   }
// }
