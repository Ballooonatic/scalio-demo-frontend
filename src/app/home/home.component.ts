import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  postId = new FormControl('', [Validators.required, Validators.pattern(/\d/)]);

  constructor(
    private router: Router,
  ) {}

  viewPost() {
    this.router.navigate(['post'], {
      queryParams: { postId: this.postId.value }
    }) 
  }  
}
