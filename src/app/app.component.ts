import { Component, Inject } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Product } from './product/product.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  get products() {
    return this.catalogService.products;
  }

  get hasProductsInStock() {
    return this.catalogService.hasProductsInStock;
  }

  get total() {
    return this.basketService.total;
  }

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    @Inject(APP_TITLE) public appTitle: string,
  ) {}

  addToBasket({ id, title, price }: Product) {
    if (this.catalogService.decreaseStock(id)) {
      this.basketService.addItem({ id, title, price });
    }
  }
}
