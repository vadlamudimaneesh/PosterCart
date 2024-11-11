import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/services/products.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  marketData: any[] = [];
  cartData: any[] = [];
  paginatedItems: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  length = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getMarketData();
    this.productsService.cartItems$.subscribe((ele) => {
      this.cartData = ele;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.length = this.length;
      this.paginator.pageSize = this.pageSize;
    }
  }

  setPaginatedItems() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedItems = this.marketData.slice(startIndex, startIndex + this.pageSize);
    // console.log('Paginated Items:', this.paginatedItems);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // console.log('Page Event:', event);
    this.setPaginatedItems();
  }

  getMarketData() {
    this.productsService.getData().subscribe((ele) => {
      this.marketData = ele.data.marketData || [];
      this.length = this.marketData.length;
      this.marketData.forEach((ele: { lastPrice: number }) => {
        ele.lastPrice = Math.floor(Math.random() * 10 + 1) * 10;
      });
      this.setPaginatedItems();
    });
  }

  updateCart(item: any, action: boolean) {
    this.productsService.updateCartData(item, action);
  }

  getQuantity(name: string) {
    const item = this.cartData.find((ele: any) => ele.name === name);
    return item ? item.quantity : 0;
  }
}
