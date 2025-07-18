import { Component } from '@angular/core';

import { Router, RouterModule, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet,  RouterModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  event(event: any) {
    console.log(event);
    
  }

}
