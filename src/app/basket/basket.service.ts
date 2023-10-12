import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _items$ = new BehaviorSubject<BasketItem[]>([]);

  items$ = this._items$.asObservable();

  total$ = this._items$.pipe(map((items) => items.reduce((total, { price }) => total + price, 0)));

  constructor(private httpClient: HttpClient) {}

  fetchBasket(): Observable<BasketItem[]> {
    return this.httpClient
      .get<BasketItem[]>(`http://localhost:8080/api/basket`)
      .pipe(tap((items) => this._items$.next(items)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.httpClient
      .post<BasketItem>(`http://localhost:8080/api/basket`, { productId })
      .pipe(tap((item) => this._items$.next([...this._items$.value, item])));
  }
}
