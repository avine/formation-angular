import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();
}
