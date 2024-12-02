import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/services/products.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DisneyLandService } from 'src/services/disney-land.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  marketData: any[] = [];
  cartData: any[] = [];
  paginatedItems: any[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10];
  pageIndex = 0;
  length = 0;
  paginator!: MatPaginator;
  charecters:any[] = [];
  localMarketData: any;
  
  constructor(
    private productsService: ProductsService,
    private disneyService : DisneyLandService,
    private localStorageService : LocalStorageService
  ) {}

  ngOnInit(): void {
    this.addMarketDataToLocal()
    // this.getMarketData();
    this.getCharecters();
    this.productsService.cartItems$.subscribe((ele) => {
      this.cartData = ele;
    });
  }

  setPaginatedItems() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedItems = this.marketData.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPaginatedItems();
  }

  addMarketDataToLocal(){
    console.log(this.localStorageService.getMarketData('marketData'), "--------------> 51")
    if(this.localStorageService.getMarketData('marketData')!= null){
      console.log("-----data avaialable")
      this.getMarketData()
    }else{
      this.productsService.getData().subscribe((ele) => {
        const apiData = ele.data.marketData
        apiData.forEach((ele: { lastPrice: number }) => {
          ele.lastPrice = Math.floor(Math.random() * 10 + 1) * 10;
        })
        this.localStorageService.setMarketData("marketData",apiData)
        this.getMarketData()
      });
    }
  }

  getMarketData() {
    this.marketData = this.localStorageService.getMarketData('marketData')
    this.length = this.marketData.length;
    this.setPaginatedItems();
  }

  updateCart(item: any, action: boolean) {
    this.productsService.updateCartData(item, action);
  }

  getQuantity(name: string) {
    const item = this.cartData.find((ele: any) => ele.name === name);
    return item ? item.quantity : 0;
  }

  
  getCharecters(){
    this.disneyService.getCharters().subscribe( (data) => {
     this.charecters = data.data.filter( (ele:any) =>  ele.imageUrl != undefined)
      // console.log(this.charecters, this.charecters.length)
    })
  }




}
