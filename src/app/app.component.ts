import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PosterCart';
  counter : Number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.counterValue$.subscribe((ele:any) => {
      this.counter = ele
    })

  }
}
