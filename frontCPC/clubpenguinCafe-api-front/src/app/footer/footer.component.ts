import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/Product';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  list: Product[] = [];

  cancelarPedido() {
    localStorage.setItem('carrinho', JSON.stringify(this.list));
  }

}
