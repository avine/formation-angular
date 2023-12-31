import { Component, Inject, OnInit } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Product } from './product/product.types';
import { SelectProductKey } from './select-product-key/select-product-key.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  products$ = this.catalogService.products$;

  hasProductsInStock$ = this.catalogService.hasProductsInStock$;

  total$ = this.basketService.total$;

  productKey: SelectProductKey = undefined;

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    @Inject(APP_TITLE) public appTitle: string,
  ) {}

  ngOnInit(): void {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }
}
