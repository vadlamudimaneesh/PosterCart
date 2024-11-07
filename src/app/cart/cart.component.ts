import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity','price'];
  cartItems : any;

  constructor( private productsService: ProductsService){}
  ngOnInit(): void {
    this.productsService.cartItems$.subscribe((ele:any) => this.cartItems = ele)
    console.log(this.cartItems)
  }

}
