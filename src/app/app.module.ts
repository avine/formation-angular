import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { SelectProductKeyComponent } from './select-product-key/select-product-key.component';
import { SortProductsPipe } from './sort-products/sort-products.pipe';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    ProductComponent,
    SelectProductKeyComponent,
    SortProductsPipe,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
