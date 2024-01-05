import { identifierName } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { addDays, format } from 'date-fns';
import { ProvinceService } from 'src/app/services/province/province.service';
import { TokenService } from 'src/app/services/token/token.service';

interface District {
  district_id: string,
  district_name: string,
  district_type: string,
  province_id: string
}

interface Ward {
  district_id: string,
  ward_id: StaticRangeInit,
  ward_name: string,
  ward_type: string
}

interface PostType {
  id: number,
  name: string,
  pricePerDay: number
}


@Component({
  selector: 'app-post-information',
  templateUrl: './post-information.component.html',
  styleUrls: ['./post-information.component.css']
})
export class PostInformationComponent {

  @ViewChild('fileInput') fileInput!: Element;

  post = {
    catalogId: 0,
    packageId: 0,
    needs: false,
    title: '',
    description: '',
    floor: 0,
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
  };

  typeAaray: any[] = [
    {
      id: 1,
      title: 'Căn hộ chung cư'
    },
    {
      id: 2,
      title: 'Nhà riêng'
    },
    {
      id: 3,
      title: 'Nhà mặt phố'
    },
    {
      id: 4,
      title: 'Đất'
    },
    {
      id: 5,
      title: 'Kho, xưởng'
    },
    {
      id: 6,
      title: 'Bất động sản khác'
    }
  ]

  unitArray: any[] = [
    {
      index: 1,
      title: 'Tỷ'
    },
    {
      index: 2,
      title: 'Triệu'
    },
    {
      index: 3,
      title: 'Triệu/m²'
    }
  ];

  factDataPostType: PostType[] = [
    {
      id: 1,
      name: "Miễn Phí",
      pricePerDay: 0
    },
    {
      id: 2,
      name: "Cơ Bản",
      pricePerDay: 2.24
    },
    {
      id: 3,
      name: "VIP Bạc",
      pricePerDay: 49.14
    },
    {
      id: 4,
      name: "VIP Vảng",
      pricePerDay: 106.38
    },
    {
      id: 5,
      name: "VIP Kim Cương",
      pricePerDay: 270
    }
  ]

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

  constructor(private provincesSvr: ProvinceService, private tokenSvr: TokenService) {
    const localData = localStorage.getItem('province');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }
  ngOnInit(): void {
    this.user = this.tokenSvr.getInfoUser();
    this.loadDistrict();
    this.priceWithNumberDays = this.setPriceWithNumbers(this.factDataPostType[0].pricePerDay);
    console.log(this.currentDay);
    this.numberSelected = 3;
    this.startDate = this.currentDay;
    this.endDate = this.addDaysToDate(this.numberSelected);

    this.typePostResult = this.factDataPostType[0].name.toString();
    this.pricePerDayResult = this.factDataPostType[0].pricePerDay;
    this.numberDayResult = this.numberSelected;
    this.totalCost = this.pricePerDayResult * this.numberDayResult;
  }

  loadDistrict() {
    this.provincesSvr.getDistricts().subscribe((Res: any) => {
      this.districtArray = Res.results;
    })
  }

  loadWard(selectedDistrictId: any) {
    this.provincesSvr.getWards(selectedDistrictId).subscribe((Res: any) => {
      this.wardArray = Res.results;
    })
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

  getImageUrl(file: File): string {
    const index = this.selectedFiles.indexOf(file);
    return this.imageUrls[index];
  }

  handleChooseType(index: any) {
    console.log(this.factDataPostType[index]);
    this.typeSelectId = this.factDataPostType[index].id;
    this.priceWithNumberDays = this.setPriceWithNumbers(this.factDataPostType[index].pricePerDay)
    if (this.factDataPostType[index].id == 1) {
      this.numberSelected = 3
    } else {
      this.numberSelected = 7;
    }
    this.endDate = this.addDaysToDate(this.numberSelected);
    this.typePostResult = this.factDataPostType[index].name.toString();
    this.setResultData(index);
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
    // this.post.needs = ;
    // this.post.floor = ;
    // this.post.document = ;
    // this.post.interior = ;
    // this.post.bedrooms = ;
    // this.post.wc = ;
    this.post.startDate = this.startDate ;
    // this.post.imageFiles=
  }

}
