import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BasketService } from './basket/basket.service';
import { BasketStubService } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogStubService } from './catalog/catalog.service.stub';
import { Product } from './product/product.types';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: BasketService, useClass: BasketStubService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const appTitle = (fixture.nativeElement.querySelector('h1') as HTMLElement).textContent;
    expect(appTitle).toContain('Bienvenue sur Zenika Ecommerce');
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products[index]);
    });
  });

  it('should not display products whose stock is empty', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements).toHaveSize(2);
    productDebugElements.forEach((productDebugElement) => {
      expect((productDebugElement.properties['product'] as Product).stock).not.toBe(0);
    });
  });

  it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    const decreaseStockSpy = spyOn(TestBed.inject(CatalogService), 'decreaseStock').and.returnValue(true);
    const addItemSpy = spyOn(TestBed.inject(BasketService), 'addItem');

    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', productDebugElement.properties['product']);

    const { id, title, price } = component.products[0];
    expect(decreaseStockSpy).toHaveBeenCalledWith(id);
    expect(addItemSpy).toHaveBeenCalledWith({ id, title, price });
  });

  it('should display a message when stock is completely empty', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.text-secondary')).toBeNull();

    (TestBed.inject(CatalogService) as CatalogStubService).hasProductsInStock = false;
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.text-secondary')?.textContent).toContain(
      'Désolé, notre stock est vide !',
    );
  });
});
