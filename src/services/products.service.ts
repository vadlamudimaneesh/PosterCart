import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = "https://api.coincentric.net.au/api/v1.0/public/exchange"
  private logoUrl = "https://api.coincentric.net.au/api/v1.0/public/getCryptoLogo/?symbol="


  constructor( private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.dataUrl)
  }

  // getLogo(symbol: string):Observable<any>{
  //   return this.http.get(this.logoUrl+symbol)
  // }


  

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
