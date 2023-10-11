import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = { id: 'ID', title: 'TITLE', description: 'DESC', photo: 'PHOTO', price: 1, stock: 2 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>('.card-img-top')?.src).toContain(
      'PHOTO',
    );
  });

  it('should display the product description', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.card-header small')?.textContent).toContain('DESC');
  });

  it('should display the product title', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.card-link')?.textContent).toContain('TITLE');
  });

  it('should display the product price', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.card-text')?.textContent).toContain('1');
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    const addToBasketSpy = spyOn(component.addToBasket, 'emit');

    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();

    expect(addToBasketSpy).toHaveBeenCalledWith(component.product);
  });

  it('should not add the "text-bg-warning" className when stock is greater than 1', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.card')?.className).not.toContain('text-bg-warning');
  });

  it('should add the "text-bg-warning" className when stock is equal to 1', () => {
    component.product.stock = 1;
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.card')?.className).toContain('text-bg-warning');
  });
});
