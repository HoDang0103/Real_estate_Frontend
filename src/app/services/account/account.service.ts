import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Các header khác nếu cần thiết
    }),
  };

  constructor(private http: HttpClient, private token: TokenService) {


  }
  postLogin(user: any): Observable<any[]> {
    const url = 'https://localhost:7015/api/Account/Login';
    return this.http.post<any[]>(url, user, this.httpOption)
  }

  postRegister(user: any): Observable<any[]> {
    const url = 'https://localhost:7015/api/Account/Register-User'
    return this.http.post<any[]>(url, user, this.httpOption);
  }

  getCurrenUser(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.getAuthToken());
    const url = 'https://localhost:7015/api/User/GetCurrentUser'
    return this.http.get<any[]>(url, { headers });
  }

  Topup(value: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.getAuthToken());
    const url = 'https://localhost:7015/api/TopUp'
    const val = { amount: value };
    console.log(url, val, { headers });
    return this.http.post<any[]>(url, val, { headers });
  }
  upDateProUser(data: { fullName: string, phoneNumber: string, image?: File }): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('PhoneNumber', data.phoneNumber);
    // formData.append('Image', data.image, data.image.name);
    formData.append('FullName', data.fullName);
    const url = 'https://localhost:7015/api/User/UpdateProfileUser';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.getAuthToken());
    console.log(data, formData);
    return this.http.put(url, formData, { headers });
  }

  resetPassword( old: string, ne : string, confirm: string): Observable<any> {
    const value = {
      oldPassword: old,
      newPassword: ne,
      confirmPassword: confirm
    }
    const url = 'https://localhost:7015/api/User/UpdateProfileUser';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.getAuthToken());
    return this.http.put(url, value, { headers });
  }

}
