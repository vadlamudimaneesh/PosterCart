import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {  
  cartItems = new BehaviorSubject<any[]>([])
  cartItems$ : Observable<any> = this.cartItems.asObservable();
  cartValue: Object = [];

  private dataUrl = "https://api.coincentric.net.au/api/v1.0/public/exchange"
  private logoUrl = "https://api.coincentric.net.au/api/v1.0/public/getCryptoLogo/?symbol="


  constructor( private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.dataUrl)
  }

  updateCartData(item: any, action: Boolean){
    const currentCart = this.cartItems.value;
    let isItemAvailable = currentCart.findIndex((cartItem:any) => cartItem.name == item.name)
    if(isItemAvailable >= 0 ){
      if(action){
        currentCart[isItemAvailable].quantity = currentCart[isItemAvailable].quantity + 1;
      }else{
        currentCart[isItemAvailable].quantity = currentCart[isItemAvailable].quantity - 1;
      }
      currentCart[isItemAvailable].totalPrice = currentCart[isItemAvailable].quantity * currentCart[isItemAvailable].price
      if(currentCart[isItemAvailable].quantity <= 0){
        const index = currentCart.findIndex(item => item.name === currentCart[isItemAvailable].name);
        if (index !== -1) {
          currentCart.splice(index, 1);
        }
      }
    }else{
      if(action){
        let itemData = {
          name : item.name,
          price : item.lastPrice,
          quantity : 1,
          totalPrice : item.lastPrice
        }
        currentCart.push(itemData)
        this.cartItems.next([...currentCart])
      }
    }
  }






  

  getSubjData(){
    const obs = new Observable<any>(obs => obs.next(Math.random()))
    obs.subscribe(ele => console.log(ele, "-----------> 37"))
    obs.subscribe(ele => console.log(ele, "-----------> 38"))
    const subj = new Subject<any>()
    subj.subscribe( obj => console.log(obj, "-------------> 40"))
    subj.subscribe( obj => console.log(obj, "-------------> 41"))
    subj.next(Math.random())

    const Bsubj = new BehaviorSubject<any>("hi")
    Bsubj.subscribe( obj => console.log(obj, "-------------> 40"))
    Bsubj.subscribe( obj => console.log(obj, "-------------> 41"))
    Bsubj.next("HI")
  }






   


}
