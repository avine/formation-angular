import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  numberOfItems$ = this.basketService.items$.pipe(map(({ length }) => length));

  constructor(private basketService: BasketService) {}
}
