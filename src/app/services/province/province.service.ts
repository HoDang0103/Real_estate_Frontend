import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>("https://vapi.vnappmob.com/api/province/")
  }
  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>("https://vapi.vnappmob.com/api/province/district/79")
  }
}
