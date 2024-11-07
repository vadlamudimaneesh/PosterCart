import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/services/products.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-products',            
  templateUrl: './products.component.html',  
  styleUrls: ['./products.component.css']    
})

export class ProductsComponent implements OnInit{
  marketData: any;
  displayedColumns: string[] = ['name', 'quantity','price'];
  cartItems = new BehaviorSubject<any[]>([])
  cartValue: Object = [];


  constructor( private productsService: ProductsService){}

  ngOnInit(): void {
    this.getMarketData()
  }

  getMarketData(){
    this.productsService.getData().subscribe(ele => {
      this.marketData = ele.data.marketData
      this.marketData.map((ele: { lastPrice: number; }) => {
        ele.lastPrice = Math.floor(Math.random() * 10 + 1) * 10;
      })
    })
  }

  addToCart(item: any){
    console.log("item added", item)
    console.log(this.cartItems.value, "------------>  40")
    const currentCart = this.cartItems.value;
    const isItemAdded = currentCart.findIndex((cartItem:any) => cartItem.name == item.name)
    if(isItemAdded >= 0){
      currentCart[isItemAdded].quantity = currentCart[isItemAdded].quantity + 1;
      currentCart[isItemAdded].totalPrice = currentCart[isItemAdded].quantity * currentCart[isItemAdded].price
    }else{
      let itemObj = {
        name : item.name,
        price : item.lastPrice,
        totalPrice : item.lastPrice,
        quantity : 1
      }
      currentCart.push(itemObj)
    }
    
    this.cartItems.subscribe( obj => console.log(obj, "-------------> 45"))
    this.cartItems.next([...currentCart])
  }


}
