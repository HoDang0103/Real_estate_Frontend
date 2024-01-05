import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token.getAuthToken());

  constructor(private http: HttpClient, private token: TokenService){
    
  } 
 
  getAllSaleProducts(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllSaleStories?page=1&pageSize=1000")
  }

  getAllStoryCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllStoryCurrentUser", {headers:this.headers})
  }

  GetAllExpiredStoryCurrentUser(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllExpiredStoryCurrentUser" , {headers:this.headers})
  }

  getAllRentProducts(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllRentStories?page=1&pageSize=1000")
  }

  getProduct(id: number): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/"+id)
  }

  getSearchSale(value: string): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/SearchSaleStory?"+value+"page=1&pageSize=100")
  }

  getSearchRent(value: string): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/SearchRentStory?"+value+"page=1&pageSize=100")
  }

  getSearchSaleByName(value: string): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllSaleStoriesByCatagoryName?catalogyName="+value+"&page=1&pageSize=1000")
  }

  getSearchRentByName(value: string): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7015/api/Story/GetAllRentStoriesByCatagoryName?catalogyName="+value+"&page=1&pageSize=1000")
  }

 



 }

