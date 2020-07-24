import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  updateCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}
