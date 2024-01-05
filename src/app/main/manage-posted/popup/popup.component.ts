import { Component, OnInit } from '@angular/core';

interface PostType {
  id: number;
  name: string;
  pricePerDay: number;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  packages: PostType[] = [
    {
      id: 1,
      name: 'Free',
      pricePerDay: 0,
    },
    {
      id: 2,
      name: 'Basic',
      pricePerDay: 2.24,
    },
    {
      id: 3,
      name: 'Silver',
      pricePerDay: 49.14,
    },
    {
      id: 4,
      name: 'Gold',
      pricePerDay: 106.38,
    },
    {
      id: 5,
      name: 'Diamond',
      pricePerDay: 270,
    },
  ];
  numberDays: number[] = [7, 10, 15];

  showPopup: boolean = false;
  numberDaySelected: number = 0;
  packageSelect: string = 'Free';
  currentDate = new Date();
  currentDay = this.currentDate.toISOString().split('T')[0];

  OnInit() {}

  toggleLoginPopup() {
    this.showPopup = !this.showPopup;
    console.log('Button in child component clicked');
  }

  closeLoginPopup() {
    this.showPopup = false;
  }

  toggleOptionPackage(event: any) {
    this.packageSelect = event.target.value;
  }

  toggleOptionNumberDay(event: any) {
    this.numberDaySelected = event.target.value;
  }
}
