import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the items when product added', () => {
    expect(service.items).toEqual([]);

    const item1 = { id: 'ID1', price: 1 } as BasketItem;
    service.addItem(item1);
    expect(service.items).toEqual([item1]);

    const item2 = { id: 'ID2', price: 2 } as BasketItem;
    service.addItem(item2);
    expect(service.items).toEqual([item1, item2]);
  });

  it('should update the total when product added', () => {
    expect(service.total).toBe(0);

    const item1 = { id: 'ID1', price: 1 } as BasketItem;
    service.addItem(item1);
    expect(service.total).toBe(1);

    const item2 = { id: 'ID2', price: 2 } as BasketItem;
    service.addItem(item2);
    expect(service.total).toBe(3);
  });
});
