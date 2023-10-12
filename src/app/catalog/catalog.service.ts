import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product } from '../product/product.types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private _products$ = new BehaviorSubject<Product[] | undefined>(undefined);

  products$ = this._products$.asObservable();

  hasProductsInStock$ = this._products$.pipe(map((products) => (products ?? []).some(({ stock }) => stock > 0)));

  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`http://localhost:8080/api/products`)
      .pipe(tap((products) => this._products$.next(products)));
  }

  decreaseStock(productId: string): void {
    const products = (this._products$.value ?? []).map((product) => {
      if (product.id !== productId || product.stock < 1) {
        return product;
      }
      return { ...product, stock: product.stock - 1 };
    });
    this._products$.next(products);
  }
}
