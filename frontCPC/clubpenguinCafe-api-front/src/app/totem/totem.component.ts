import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopListService } from '../services/shop-list.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-totem',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavComponent],
  templateUrl: './totem.component.html',
  styleUrl: './totem.component.css',
})
export class TotemComponent implements OnInit {
  list: Product[] = [];
  constructor(
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

  AddProduto() {
    var added = false;
    this.list.map((it) => {
      if (it.produto == this.produto) {
        it.descricao = this.descricao;
        added = true;
      }
    });

    if (!added) {
      this.list.push({
        produto: this.produto,
        descricao: this.descricao,
        preco: this.preco,
      });
    }

    this.service.updateList(this.list);
  }
}
