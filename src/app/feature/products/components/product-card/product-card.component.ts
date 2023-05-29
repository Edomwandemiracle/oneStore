import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/utils/models/product';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit() {
  }

}
