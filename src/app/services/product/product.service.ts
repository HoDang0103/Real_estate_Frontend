import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token.getAuthToken()
  );

  constructor(private http: HttpClient, private token: TokenService) {}

  getAllSaleProducts(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllSaleStories?page=1&pageSize=1000'
    );
  }

  getAllStoryCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllStoryCurrentUser',
      { headers: this.headers }
    );
  }

  GetAllExpiredStoryCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllExpiredStoryCurrentUser',
      { headers: this.headers }
    );
  }

  getAllRentProducts(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllRentStories?page=1&pageSize=1000'
    );
  }

  getProduct(id: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7015/api/Story/' + id);
  }

  getSearchSale(value: string): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/SearchSaleStory?' +
        value +
        'page=1&pageSize=100'
    );
  }

  getSearchRent(value: string): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/SearchRentStory?' +
        value +
        'page=1&pageSize=100'
    );
  }

  getSearchSaleByName(value: string): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllSaleStoriesByCatagoryName?catalogyName=' +
        value +
        '&page=1&pageSize=1000'
    );
  }

  getSearchRentByName(value: string): Observable<any[]> {
    return this.http.get<any[]>(
      'https://localhost:7015/api/Story/GetAllRentStoriesByCatagoryName?catalogyName=' +
        value +
        '&page=1&pageSize=1000'
    );
  }

  createStory(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('PackageID', data.packageId);
    formData.append('Street', data.street);
    formData.append('Unit', data.unit);
    formData.append('Price', data.price);
    formData.append('WC', data.wc);
    formData.append('Area', data.area);
    formData.append('District', data.district);
    formData.append('Interior', data.interior);
    formData.append('StartDate', data.startDate);
    formData.append('CatalogID', data.catalogId);
    formData.append('Bedrooms', data.bedrooms);
    formData.append('Title', data.title);
    formData.append('Project', data.project);
    formData.append('Document', data.document);
    formData.append('Ward', data.ward);
    formData.append('Description', data.description);
    formData.append('Needs', data.needs);
    formData.append('Needs', data.needs);
    // formData.append('ImageFiles', data.imageFiles);

    formData.append('Save', data.save);
    formData.append('Floor', data.floor);
    formData.append('Address', data.address);
    formData.append('Location', data.location);
    formData.append('State', data.state);
    formData.append('CreatedAt', data.createdAt);
    formData.append('UpdatedAt', data.updatedAt);
    formData.append('UserID', data.userId);

    for (let i = 0; i < data.imageFiles.length; i++) {
      formData.append('ImageFiles', data.imageFiles[i]);
      // Thêm các trường dữ liệu bổ sung nếu cần
    }
    const url = 'https://localhost:7015/api/Story/create';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.getAuthToken()
    );
    console.log(data, url, formData, headers);
    return this.http.post(url, formData, { headers });
  }
}
