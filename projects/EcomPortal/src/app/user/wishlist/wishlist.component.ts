import { Component, OnInit, ViewChild } from '@angular/core';
import { WishlistService } from './service/wishlist.service';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatTable } from '@angular/material';
import { ProductService } from '../product/service/product.service';
import { CartService } from '../cart/service/cart.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  @ViewChild('wishListTable') wishListTable: MatTable<any>;
  wishList = [];
   pid :string
  displayedColumns: string[] = ['imageUrl', 'productName', 'price', 'actions'];
  constructor(private wishListService: WishlistService,private cart:CartService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.wishListService.getWishList()
      .subscribe(result => {
      // console.log("ervgevrev"+JSON.stringify(result.data[0].productId))
        this.pid = result.data[0].productId;
        result.data.forEach((product: any) => {
          this.wishList.push(product.UserWishList[0]);
        });
        this.wishListTable.dataSource = this.wishList;
        this.wishListTable.renderRows();
      });

      
  }

 
  addToCart(){
    let produc = {
      productId :this.pid,
      quantity: 1

    }
    console.log("cart wrking"+this.pid)
    this.cart.addProductToCart(produc).subscribe((result)=>{
      console.log("cart wrking")
      this.snackBar.open('Product Added to cart!', 'Product', {
        duration: 1000
      });

    })
  }
     
    
  }


