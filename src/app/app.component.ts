import { Component } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniETicaretClient';
  constructor(){
  }

  
}

$.get("https://localhost:7105/api/Products/getall", (data) => {
  console.log(data);
});