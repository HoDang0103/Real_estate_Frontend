import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() onClose: () => void = () => {};
  @Input() isSuccess: boolean = true;

  submi(): void {
    // this.onClose();
  }

}
