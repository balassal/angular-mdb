import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getAllPost(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPost(post: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  updatePost(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}
