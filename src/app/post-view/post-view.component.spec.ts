import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { AppModule } from '../app.module';
import { PostsService } from '../services/posts.service';
import { Post, PostViewComponent } from './post-view.component';

describe('PostViewComponent', () => {
  let testPost: Post = {
    id: 0,
    userId: 0,
    title: 'test',
    body: 'post'
  };
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;
  let activatedRoute = new ActivatedRouteStub({ postId: testPost.id });
  class TestPostsService {
    getPost = () => of(testPost);
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [PostViewComponent],
      imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        AppModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PostsService, useClass: TestPostsService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieves post upon init', () => {
    component.ngOnInit();
    expect(component.post).toBe(testPost)
    component.ngOnDestroy();
  });

});
