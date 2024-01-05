import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  providers: [DatePipe],
})
export class PostItemComponent {
  @Input() item?: any;
  @Input() isExist?: any;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  baseUrl = 'https://localhost:7015/';
  constructor(private datePipe: DatePipe, private router: Router) {}

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  sendClickEvent() {
    // this.clicked.emit(); // Phát sự kiện đến component cha
    this.router.navigate(['post-information-detail', this.item.id]);
    console.log('dd');
  }
}
