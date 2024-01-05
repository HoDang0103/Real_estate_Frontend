import { Component, Input } from '@angular/core';

interface Item {
  id: number;
  name: string;
}


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() item?: Item;
}
