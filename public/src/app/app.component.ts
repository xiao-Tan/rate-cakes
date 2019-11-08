import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cake';
  show_form = false;
  show_allCakes = false;
  show_one = false;
  one_cake: any;
  one_rate: any;
  allCakes = [];
  validation_error = []
  rate_error = {};   //set to dictionary
  this_cake: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.one_cake = { baker_name: "", image_url: "" }
    this.one_rate = { stars: 5, comment: "" }
  }

  showForm() {
    this.show_form = true;
  }

  showAllCakes() {
    this.validation_error = [];
    this.rate_error = {};
    this.show_allCakes = true;
    this._httpService.getCakes()
      .subscribe(data => {
        this.allCakes = data['result'];
      })
  }

  onSubmit() {
    this._httpService.addCake(this.one_cake)
      .subscribe((data: any) => {
        this.one_cake = { baker_name: "", image_url: "" }
        if (data.message == "success") {
          this.showAllCakes();
        }
        else {
          this.validation_error = [];
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.validation_error.push(data['errors'][error_key]['message'])
          }
        }
      })
  }

  onSubmitRate(id){
    this._httpService.addRate(id, this.one_rate)
      .subscribe((data:any) => {
        this.one_rate = { stars: 5, comment: "" }
        if (data.message == "success") {
          this.showAllCakes();
          this.showOneCake(id)
        }
        else {
          this.rate_error[id] = [];
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.rate_error[id].push(data['errors'][error_key]['message'])
          }
        }
      })     
  }

  showOneCake(id){
    this._httpService.getOneCake(id)
     .subscribe(data => {
        this.this_cake = data['result'];
        console.log("hehehhehehhehe")
        this.show_one = true;
      })  
  }
}
