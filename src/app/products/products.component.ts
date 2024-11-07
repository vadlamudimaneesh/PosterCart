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

  updateCart(item:any){
    this.productsService.updateCartData(item);

  }

}
