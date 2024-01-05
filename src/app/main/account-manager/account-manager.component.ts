import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;


  activeTab = 'search';
  selectedFile: File | null = null;
  imagePreview: string[] = [];
  user: any = {};
  nowPass: string = '';
  newPass: string = '';
  reNewPass: string = '';
  money: number = 0;
  isMoney: boolean = false;

  showSuccessMessage: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private http: HttpClient, private token: TokenService,
    private accountSrv: AccountService) { }

  search(activeTab: any) {
    this.activeTab = activeTab;
  }

  result(activeTab: any) {
    this.activeTab = activeTab;
  }

  openFileInput(): void {
    // Mở input tệp khi người dùng nhấp vào vòng tròn
    const fileInput = this.fileInput.nativeElement;
    fileInput.click();
  }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0] as File;
  // }

  handleFileChange(event: any): void {
    // Xử lý khi người dùng chọn một tệp
    const selectedFile = event.target.files[0] as File;

    // Ở đây, bạn có thể thực hiện xử lý tệp được chọn, ví dụ: tải lên lên server
    console.log('Đã chọn ảnh:', selectedFile);

    // Nếu bạn muốn hiển thị ảnh đã chọn, bạn có thể đọc URL của nó và gán vào một biến
    // Ví dụ: this.imageUrl = URL.createObjectURL(selectedFile);
  }

  ngOnInit(): void {

    this.user = this.token.getInfoUser();
    this.imagePreview[0] = this.user.img;
    console.log(this.user.img);
    console.log(this.imagePreview[0]);
  }

  resetPassword() {
    this.accountSrv.resetPassword(this.nowPass, this.newPass, this.reNewPass).subscribe({
      next: (Res:any) => {
        this.popupMessage='Đổi mật khẩu thành công.'
        this.showSuccessMessage = true;
        this.isSuccess = true;
      },
      error: (error: any) => {
        this.popupMessage='Đổi mật khẩu thất bại.'
        this.showSuccessMessage = true;
        this.isSuccess = false;
      } 
    })
  }

  upDateUser() {

     let imge: File ; 

    if (this.selectedFile) {
      imge = this.selectedFile;
    }

    this.accountSrv.upDateProUser({
      fullName: this.user.fullName,
      phoneNumber: this.user.phoneNumber,
      // image: imge
    }).subscribe({
      next: (Res: any) => {
        this.showSuccessMessage = true;
        this.popupMessage = 'Cập nhật thành công.'
        this.isSuccess = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); // 3 giây
        console.log('2');
      },
      error: (error: any) => {
        this.showSuccessMessage = true;
        this.popupMessage = 'Cập nhật thất bại.'
        this.isSuccess = false;
        console.log('1');

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); // 3 giâyFFDFG
        console.log(error);
      }
    })
  }


  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files[0];

    // Xem trước hình ảnh

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview[0] = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('your-api-endpoint', formData)
        .subscribe(response => {
          console.log('Upload successful:', response);
        }, error => {
          console.error('Error uploading file:', error);
        });
    }
  }
  topUp() {
    this.accountSrv.Topup(this.money).subscribe({
      next: (Res: any) => {
        window.open(Res.paypalUrl, '_self');
      },
      error: (error: any) => {

      }
    })
  }

  showTopup() {
    this.isMoney = !this.isMoney;
    this.money = 0;
  }
}
