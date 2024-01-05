import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-posted',
  templateUrl: './manage-posted.component.html',
  styleUrls: ['./manage-posted.component.css']
})
export class ManagePostedComponent {
   activeTab = 'all';

   items: any[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  allPosts(activeTab: any){
    this.activeTab = activeTab;
  }

  expiredPosts(activeTab : any){
    this.activeTab = activeTab;
  }
}
