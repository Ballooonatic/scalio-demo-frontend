import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { Post } from '../post-view/post-view.component';
import { of, throwError } from 'rxjs';

describe('PostsService', () => {

  let postsService: PostsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    postsService = new PostsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedPost: Post = { id: 1, userId: 1, title: 'A', body: 'a' }
  
    httpClientSpy.get.and.returnValue(of(expectedPost));
  
    postsService.getPost(0).subscribe({
      next: post => {
        expect(post)
          .withContext('expected post')
          .toEqual(expectedPost);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
  
  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(throwError(errorResponse));
  
    postsService.getPost(0).subscribe({
      next: posts => done.fail('expected an error, not posts'),
      error: error  => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    });
  });
});
