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
  cartValue : any;
  constructor( private productsService: ProductsService){}
  ngOnInit(): void {
    this.initialiseCartvalue()
    this.productsService.cartItems$.subscribe((ele:any) => this.cartItems = ele)
    this.productsService.cartvalue$.subscribe((ele:any) => this.cartValue = ele)
  }

  initialiseCartvalue(){
    this.productsService.cartvalue$.subscribe((ele:any) => this.cartValue = ele)
  }

  updateCart(item: any,action: any){
    this.productsService.updateCartData(item,action)
    // console.log(item, action)
  }

  clearitem(item:any){
    // console.log(item)
    this.productsService.removeItemFromCart(item);
  }

}
