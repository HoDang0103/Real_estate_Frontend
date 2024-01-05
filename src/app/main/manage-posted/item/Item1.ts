import { Component } from "@angular/core";

@Component({
    selector: 'app-item-1',
  template: `
    <div class="card tab-page">
      <div class="card-body">
        <h1>{{page}}</h1>
        <div class="mt-3">
          Landing page content 1
        </div>
      </div>
    </div>
  `
})
export class Item1 {
  page = 'Landing';
  constructor(){}  
}