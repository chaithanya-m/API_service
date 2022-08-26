import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  apiUrl: string = 'https://crudcrud.com/api/e79fa10e78f34f9981e2a55a315b65d2/posts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  // Show lists of posts
  list(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
   // Create new post
  
   create(data:any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
 }
 // Delete
 delete(id: any): Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
    catchError(this.handleError)
  );
}
liked(posts:any,id: any): Observable<any> {
  delete posts._id;
  
 return this.httpClient.put(`${this.apiUrl}/${id}`,posts).pipe(

    catchError(this.handleError)
  );
}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
