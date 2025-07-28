import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Product as productService } from '../service/product';

@Component({
  selector: 'app-newspaper',
  imports: [CommonModule],
  templateUrl: './newspaper.html',
  styleUrl: './newspaper.css',
})
export class Newspaper {
  productData: any = [];

  constructor(
    private productService: productService,
    private cdr: ChangeDetectorRef,
  ) {}
  // Fetching Production function name(params:type)

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.productData = data;
      this.cdr.detectChanges();
    });
  }
}
