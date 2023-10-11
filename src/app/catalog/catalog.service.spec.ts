import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrease the product stock', () => {
    expect(service.products[0].stock).toBe(2);

    service.decreaseStock(service.products[0].id);

    expect(service.products[0].stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    expect(service.products[0].stock).toBe(2);

    expect(service.decreaseStock(service.products[0].id)).toBeTrue();
    expect(service.products[0].stock).toBe(1);

    expect(service.decreaseStock(service.products[0].id)).toBeTrue();
    expect(service.products[0].stock).toBe(0);

    expect(service.decreaseStock(service.products[0].id)).toBeFalse();
    expect(service.products[0].stock).toBe(0);
  });
});
