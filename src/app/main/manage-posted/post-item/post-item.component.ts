import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Item {
  id: number;
  name: string;
}


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  providers: [DatePipe] 
})
export class PostItemComponent {
  @Input() item?: any;
  @Input()  isExist?: any;
  baseUrl = "https://localhost:7015/";
  constructor(private datePipe: DatePipe){
    
  }

  formatDate(date:string ): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || "";
  }
}
