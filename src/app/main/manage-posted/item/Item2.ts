import { Component } from "@angular/core";

@Component({
    selector: 'app-item-2',
  template: `
    <div class="card tab-page">
      <div class="card-body">
        <h1>{{page}}</h1>
        <div class="mt-3">
          Landing page content 2
        </div>
      </div>
    </div>
  `
})
export class Item2 {
  page = 'Landing';
  constructor(){}  
}