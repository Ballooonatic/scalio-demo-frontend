import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post: Post;
  $post: Subscription;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,

  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(params => {
      this.$post = this.postsService.getPost(params['postId'])
        .pipe(
          catchError(() => {
            return of(this.loading = false)
          })
        )
        .subscribe(post => {
          this.post = post as Post;
          this.loading = false;
        })
    });
  }

  ngOnDestroy() {
    this.$post.unsubscribe()
  }
}
