import { Component, OnInit, Input,  SimpleChanges, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit, OnChanges {
  @Input() this_cake: any;
  average: any;

  constructor(private _httpService: HttpService) {  
  }

  ngOnInit() {
    console.log("haha");
    console.log(this.this_cake);
    this.getAverage();
  }

  ngOnChanges(changes: SimpleChanges){
    if(typeof changes['this_cake'] !== "undefined"){
      var change = changes['this_cake'];
      if(!change.isFirstChange()){
        this.getAverage();
      }
    }
  }

  getAverage(){
    if(this.this_cake['rates'].length == 0){
      this.average = "N/A"
    }
    else{
      var sum = 0;
      for(let i = 0; i < this.this_cake['rates'].length; i++){
        sum = sum + this.this_cake['rates'][i]['stars'];
      }
      this.average = (sum / this.this_cake['rates'].length).toFixed(1);
    } 
    return this.average; 
  }
}
