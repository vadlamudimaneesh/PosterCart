import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity','price', 'clear'];
  cartItems : any;
  cartValue : any = 0;

  constructor( private productsService: ProductsService){}
  ngOnInit(): void {
    this.productsService.cartItems$.subscribe((ele:any) => this.cartItems = ele)
    console.log(this.cartItems, "---------------> 16")
    // this.cartItems.forEach((item: any) => {
    //   this.cartValue = this.cartValue + item.totalPrice
    // })

  }

  updateCart(item: any,action: any){
    this.productsService.updateCartData(item,action)
    console.log(item, action)
  }

  clearitem(item:any){
    console.log(item)
    this.productsService.removeItemFromCart(item);
  }

}
