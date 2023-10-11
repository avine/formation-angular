import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Product } from './product/product.types';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.properties['product']).toBe(component.products[index]);
    });
  });

  it('should update the total when "addToBasket" class method is called', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    productDebugElements[0].triggerEventHandler('addToBasket', productDebugElements[0].properties['product']);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('header p')?.textContent).toContain(
      `Votre panier s'élève à ${component.products[0].price} €`,
    );
  });

  it('should update the total when a product emits the "addToBasket" event', () => {
    component.addToBasket({ price: 1 } as Product);
    expect(component.total).toBe(1);

    component.addToBasket({ price: 2 } as Product);
    expect(component.total).toBe(3);
  });

  it('should decrease the stock of the product added to the basket', () => {
    expect(component.products[0].stock).toBe(2);

    const productDebugElement = fixture.debugElement.query(By.css('app-product'));
    productDebugElement.triggerEventHandler('addToBasket', productDebugElement.properties['product']);

    expect(component.products[0].stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    component.products[0].stock = 0;
    fixture.detectChanges();

    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productDebugElements[0].properties['product']).toBe(component.products[1]);
    expect(productDebugElements[1].properties['product']).toBe(component.products[2]);
    expect(productDebugElements[2].properties['product']).toBe(component.products[3]);
  });

  it('should display a message when stock is completely empty', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.text-secondary')).toBeNull();

    component.products.forEach((product) => (product.stock = 0));
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.text-secondary')?.textContent).toContain(
      'Désolé, notre stock est vide !',
    );
  });
});
