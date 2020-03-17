import { Component } from '@angular/core';
import { PagerService } from './_services/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  phoneNumber: string = '240 486 6106';
  allAlphabets: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  showResults: boolean = false;
  isError: boolean = false;
  allItems = [];
  randomResults: any = [200,400];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor( private pagerService: PagerService ) {
    this.setPage(1);
  }

  checkPhone() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(( this.phoneNumber.match( phoneno ) ) ) {
        return true;
    } else {
        return false;
    }
  }

  generateRandom( min, max ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateNumbers() {
    this.allItems = [];
    this.showResults = true;
    for( var i = 0; i< this.generateRandom( this.randomResults[0],this.randomResults[1] ); i++ ) {
      var replaceNumbers = this.generateRandom(1,this.phoneNumber.length-4);
      var str1 = this.phoneNumber.substr(0,replaceNumbers);
      var str2 = this.allAlphabets.charAt( this.generateRandom( 0, this.allAlphabets.length-1 ) );

      var finalstr = (str1+str2);

      this.allItems.push({
        phone: finalstr
      });
    }
    this.setPage(1);
  }

  search() {
    this.isError = false;
    this.showResults = false;

    if( this.checkPhone() ) {
      this.generateNumbers();
    } else {
      this.isError = true;
    }
  }

  setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
