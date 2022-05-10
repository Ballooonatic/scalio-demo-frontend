import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPost(postId: number) {
    return this.http.get(`${environment.apiUrl}/posts/${postId}`)
    .pipe(
      // delay(1000),
      // use this to see loading functionality
      catchError(err => throwError(err))
    )
  }
}
