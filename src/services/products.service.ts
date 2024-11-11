import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {  
  cartItems = new BehaviorSubject<any[]>([])
  cartItems$ : Observable<any> = this.cartItems.asObservable();
  cartValue = new BehaviorSubject<any>(0)
  cartvalue$ : Observable<any> = this.cartValue.asObservable();
  counterValue = new BehaviorSubject<any>(0)
  counterValue$ : Observable<any> = this.counterValue.asObservable();



  private dataUrl = "https://api.coincentric.net.au/api/v1.0/public/exchange"
  private logoUrl = "https://api.coincentric.net.au/api/v1.0/public/getCryptoLogo/?symbol="


  constructor( private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.dataUrl)
  }


  removeItemFromCart(item: any){
    let cValue = 0;
    let counter = 0;
    const currentCart = this.cartItems.value;
    let isItemAvailable = currentCart.findIndex((cartItem:any) => cartItem.name == item.name)
    if(isItemAvailable >= 0 ){
      const index = currentCart.findIndex(item => item.name === currentCart[isItemAvailable].name);
      if (index !== -1) {
        currentCart.splice(index, 1);
        this.cartItems.next([...currentCart])
        this.cartItems.subscribe((ele:any)=>{
        ele.forEach((item:any) => {
          cValue = cValue + item.totalPrice
          counter = counter + item.quantity
        })
        this.cartValue.next(cValue);
        this.counterValue.next(counter);
        })
      }
    }
  }

  updateCartData(item: any, action: Boolean){
    let cValue = 0;
    let counter = 0;
    const currentCart = this.cartItems.value;
    let isItemAvailable = currentCart.findIndex((cartItem:any) => cartItem.name == item.name)
    if(isItemAvailable >= 0 ){
      if(action){
        currentCart[isItemAvailable].quantity = currentCart[isItemAvailable].quantity + 1;
      }else{
        currentCart[isItemAvailable].quantity = currentCart[isItemAvailable].quantity - 1;
      }
      currentCart[isItemAvailable].totalPrice = currentCart[isItemAvailable].quantity * currentCart[isItemAvailable].lastPrice
      if(currentCart[isItemAvailable].quantity < 1){
        const index = currentCart.findIndex(item => item.name === currentCart[isItemAvailable].name);
        if (index !== -1) {
          currentCart.splice(index, 1);
        }
      }
      this.cartItems.next([...currentCart])
      this.cartItems.subscribe((ele:any)=>{
      ele.forEach((item:any) => {
        cValue = cValue + item.totalPrice
        counter = counter + item.quantity
      })
      this.cartValue.next(cValue);
      this.counterValue.next(counter);
    })
    }else{
      if(action){
        item["quantity"] = 1
        item["totalPrice"] = item.lastPrice
        currentCart.push(item)
        this.cartItems.next([...currentCart])
        this.cartItems.subscribe((ele:any)=>{
          ele.forEach((item:any) => {
            cValue = cValue + item.totalPrice
            counter = counter + item.quantity
          })
          this.cartValue.next(cValue);
          this.counterValue.next(counter);
          })
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
