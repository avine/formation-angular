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
});
