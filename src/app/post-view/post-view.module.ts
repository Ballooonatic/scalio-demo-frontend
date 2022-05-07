import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostViewComponent } from './post-view.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
    { 
      path: '',
      component: PostViewComponent
    },
  ]

@NgModule({
  declarations: [PostViewComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class PostViewModule {}