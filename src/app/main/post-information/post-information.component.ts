import { SuccessPopupComponent } from './../success-popup/success-popup.component';
import { identifierName } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { addDays, format } from 'date-fns';
import { ProductService } from 'src/app/services/product/product.service';
import { ProvinceService } from 'src/app/services/province/province.service';
import { TokenService } from 'src/app/services/token/token.service';

interface District {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}

interface Ward {
  district_id: string;
  ward_id: StaticRangeInit;
  ward_name: string;
  ward_type: string;
}

interface PostType {
  id: number;
  name: string;
  pricePerDay: number;
}

@Component({
  selector: 'app-post-information',
  templateUrl: './post-information.component.html',
  styleUrls: ['./post-information.component.css'],
})
export class PostInformationComponent {
  @ViewChild('fileInput') fileInput!: Element;

  packages: any[] = [
    {
      id: 1,
      name: 'Basic',
      pricePerDay: 2000,
      numberDay: 7,
      stories: null,
    },
    {
      id: 2,
      name: 'Basic',
      pricePerDay: 1900,
      numberDay: 10,
      stories: null,
    },
    {
      id: 3,
      name: 'Basic',
      pricePerDay: 1700,
      numberDay: 15,
      stories: null,
    },
    {
      id: 4,
      name: 'Silver',
      pricePerDay: 4000,
      numberDay: 7,
      stories: null,
    },
    {
      id: 5,
      name: 'Silver',
      pricePerDay: 3800,
      numberDay: 10,
      stories: null,
    },
    {
      id: 6,
      name: 'Silver',
      pricePerDay: 3500,
      numberDay: 15,
      stories: null,
    },
    {
      id: 7,
      name: 'Gold',
      pricePerDay: 8000,
      numberDay: 7,
      stories: null,
    },
    {
      id: 8,
      name: 'Gold',
      pricePerDay: 7700,
      numberDay: 10,
      stories: null,
    },
    {
      id: 9,
      name: 'Gold',
      pricePerDay: 7200,
      numberDay: 15,
      stories: null,
    },
    {
      id: 10,
      name: 'Diamond',
      pricePerDay: 15000,
      numberDay: 7,
      stories: null,
    },
    {
      id: 11,
      name: 'Diamond',
      pricePerDay: 14500,
      numberDay: 10,
      stories: null,
    },
    {
      id: 12,
      name: 'Diamond',
      pricePerDay: 13500,
      numberDay: 15,
      stories: null,
    },
    {
      id: 13,
      name: 'Free',
      pricePerDay: 0,
      numberDay: 3,
      stories: null,
    },
  ];

  post: any = {
    catalogId: 0,
    packageId: 0,
    needs: false,
    title: '',
    description: '',
    district: '',
    ward: '',
    street: '',
    project: '',
    area: 0,
    price: 0,
    unit: '',
    document: '',
    interior: '',
    bedrooms: 0,
    wc: 0,
    startDate: '',
    imageFiles: [],
    save: false,
    floor: 3,
    address: 'null',
    location: 'null',
    state: false,
    createdAt: '2002-11-25',
    updatedAt: '2002-11-25',
    userID: 'null',
  };

  typeAaray: any[] = [
    {
      id: 1,
      title: 'Căn hộ chung cư',
    },
    {
      id: 2,
      title: 'Nhà riêng',
    },
    {
      id: 3,
      title: 'Nhà mặt phố',
    },
    {
      id: 4,
      title: 'Đất',
    },
    {
      id: 5,
      title: 'Kho, xưởng',
    },
    {
      id: 6,
      title: 'Bất động sản khác',
    },
  ];

  unitArray: any[] = [
    {
      index: 1,
      title: 'Tỷ',
    },
    {
      index: 2,
      title: 'Triệu',
    },
    {
      index: 3,
      title: 'Triệu/m²',
    },
  ];

  paper: any[] = [
    {
      code: 'Sổ đỏ/ Số hồng',
      name: 'Sổ đỏ/ Số hồng',
    },
    {
      code: 'Hợp đồng mua bán',
      name: 'Hợp đồng mua bán',
    },
    {
      code: 'Đang chờ sổ',
      name: 'Đang chờ sổ',
    },
  ];

  furniture: any[] = [
    {
      code: 'Đầy dủ',
      name: 'Đầy dủ',
    },
    {
      code: 'Cơ bản',
      name: 'Cơ bản',
    },
    {
      code: 'Không nội thất',
      name: 'Không nội thất',
    },
  ];

  factDataPostType: PostType[] = [
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

  options = [
    { label: 'Bán', value: true },
    { label: 'Cho thuê', value: false },
  ];
  selectedOption: boolean = true;

  districtArray: District[] = [];
  wardArray: Ward[] = [];
  loggedObj: any = {};
  optionsArea: string = '';
  selectedFiles: File[] = [];
  imageUrls: string[] = [];
  typeSelectId: number = this.factDataPostType[0].id;
  numberDays: number[] = [7, 10, 15];
  numberSelected!: number;
  priceWithNumberDays: number[] = [];
  startDate: string = '';
  endDate: string = '';
  currentDate = new Date();
  currentDay = this.currentDate.toISOString().split('T')[0];
  typePostResult: string = '';
  pricePerDayResult: number = 0;
  numberDayResult: number = 0;
  totalCost: number = 0;
  user: any = {};
  paperSelected!: string;
  furnitureSelected!: string;
  optionSelected!: boolean;

  showSuccessMessage: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;
  packagedSelected: number = 0;

  constructor(
    private provincesSvr: ProvinceService,
    private tokenSvr: TokenService,
    private productSrv: ProductService
  ) {
    const localData = localStorage.getItem('province');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }
  ngOnInit(): void {
    this.packages[0].is;
    this.user = this.tokenSvr.getInfoUser();
    this.loadDistrict();
    this.priceWithNumberDays = this.setPriceWithNumbers(
      this.factDataPostType[0].pricePerDay
    );
    console.log(this.currentDay);
    this.numberSelected = 3;
    this.startDate = this.currentDay;
    this.endDate = this.addDaysToDate(this.numberSelected);

    this.typePostResult = this.factDataPostType[0].name.toString();
    this.pricePerDayResult = this.factDataPostType[0].pricePerDay;
    this.numberDayResult = this.numberSelected;
    this.totalCost = this.pricePerDayResult * this.numberDayResult;

    this.paperSelected = this.paper[0].code;
    this.furnitureSelected = this.furniture[0].code;
    this.optionSelected = this.options[0].value;

    this.packagedSelected = this.selectPackage(
      this.typePostResult,
      this.numberSelected
    );
    console.log(this.packagedSelected);
  }

  loadDistrict() {
    this.provincesSvr.getDistricts().subscribe((Res: any) => {
      this.districtArray = Res.results;
    });
  }

  loadWard(selectedDistrictId: any) {
    this.provincesSvr.getWards(selectedDistrictId).subscribe((Res: any) => {
      this.wardArray = Res.results;
    });
  }

  toggleOptionDistrict(event: any): void {
    const indexDistrict = event.target.value;
    this.post.district = this.districtArray[indexDistrict].district_name;

    this.loadWard(this.districtArray[indexDistrict].district_id);

    // const district = target.value as District;

    // if (this.optionsArea == district_name) {
    //   this.optionsArea = '';
    // } else {
    //   this.optionsArea = district_name;
    // }
  }

  toggleOptionWard(event: any): void {
    const indexWard = event.target.value;
    this.post.ward = this.wardArray[indexWard].ward_name;
    // const district = target.value as District;

    // if (this.optionsArea == district_name) {
    //   this.optionsArea = '';
    // } else {
    //   this.optionsArea = district_name;
    // }
  }

  toggleOptionUnit(event: any): void {
    const indexUnit = event.target.value;
    this.post.unit = this.unitArray[indexUnit].title;
  }

  toggleOptionType(event: any): void {
    this.post.catalogId = event.target.value;
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls[i] = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  uploadFiles() {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(
        'files[]',
        this.selectedFiles[i],
        this.selectedFiles[i].name
      );
      // Thêm các trường dữ liệu bổ sung nếu cần
      formData.append('description', 'Some description');
    }

    // this.httpClient.post('https://example.com/upload-multiple', formData)
    //   .subscribe(
    //     (response) => {
    //       console.log('Uploaded successfully:', response);
    //       // Xử lý kết quả sau khi upload thành công
    //     },
    //     (error) => {
    //       console.error('Upload failed:', error);
    //       // Xử lý lỗi khi upload
    //     }
    //   );
  }

  getImageUrl(file: File): string {
    const index = this.selectedFiles.indexOf(file);
    return this.imageUrls[index];
  }

  handleChooseType(index: any) {
    console.log(this.factDataPostType[index]);
    this.typeSelectId = this.factDataPostType[index].id;
    this.priceWithNumberDays = this.setPriceWithNumbers(
      this.factDataPostType[index].pricePerDay
    );
    if (this.factDataPostType[index].id == 1) {
      this.numberSelected = 3;
    } else {
      this.numberSelected = 7;
    }
    this.endDate = this.addDaysToDate(this.numberSelected);
    this.typePostResult = this.factDataPostType[index].name.toString();
    this.setResultData(index);
    this.packagedSelected = this.selectPackage(
      this.typePostResult,
      this.numberDayResult
    );

    console.log(this.packagedSelected);
  }

  setPriceWithNumbers(pricePerDay: number): number[] {
    const priceWithNumberDayList: number[] = [];
    for (let i = 0; i < 3; i++) {
      priceWithNumberDayList[i] = pricePerDay * this.numberDays[i];
    }
    return priceWithNumberDayList;
  }

  handleChooseNumber(numberDay: any) {
    this.numberSelected = numberDay;
    this.endDate = this.addDaysToDate(this.numberSelected);

    this.numberDayResult = this.numberSelected;
    this.totalCost = this.pricePerDayResult * this.numberDayResult;
    this.packagedSelected = this.selectPackage(
      this.typePostResult,
      this.numberDayResult
    );

    console.log(this.packagedSelected);
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    console.log('Ngày mới:', this.startDate);
    // Cập nhật logic xử lý khi ngày thay đổi ở đây
    this.endDate = this.addDaysToDate(this.numberSelected);
  }

  addDaysToDate(days: number) {
    const newDate = addDays(this.startDate, days);
    return format(newDate, 'dd/MM/yyyy'); // Format lại ngày theo chuẩn HTML type="date"
  }

  formatDate(date: any): string {
    return format(date, 'dd/MM/yyyy');
  }

  setResultData(index: number) {
    this.typePostResult = this.factDataPostType[index].name.toString();
    this.pricePerDayResult = this.factDataPostType[index].pricePerDay;
    this.numberDayResult = this.numberSelected;
    this.totalCost = this.pricePerDayResult * this.numberDayResult;
  }

  postNew() {
    // this.post.packageId = ,
    this.post.needs = this.optionSelected;
    this.post.document = this.paperSelected;
    this.post.interior = this.furnitureSelected;
    this.post.startDate = this.startDate;
    this.post.imageFiles = this.selectedFiles;
    this.post.packageId = this.packagedSelected;

    console.log(this.post);
    this.productSrv.createStory(this.post).subscribe({
      next: (Res: any) => {
        this.showSuccessMessage = true;
        this.popupMessage = 'Đăng bài thành công';
        this.isSuccess = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); // 3 giâyFFDFG
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  handlePaperSelect(index: number) {
    this.paperSelected = this.paper[index].code;
  }

  handleFurnitureSelect(index: number) {
    this.furnitureSelected = this.furniture[index].code;
  }

  // Trong file component của bạn
  onRadioChange(selectedValue: any) {
    console.log('Giá trị đã chọn:', selectedValue);
    // Thực hiện các hành động cần thiết sau khi radio button được chọn
    this.optionSelected = selectedValue;
  }

  selectPackage(packageName: string, numberDay: number): number {
    let id = 0;
    this.packages.forEach((element) => {
      if (element.numberDay)
        if (packageName == element.name && numberDay == element.numberDay) {
          // console.log(packageName, numberDay, element.id);
          id = element.id;
        }
    });
    return id;
  }
}
