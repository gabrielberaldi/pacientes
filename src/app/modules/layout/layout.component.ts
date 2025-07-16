import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ MatSidenavModule, MatToolbarModule, MatButtonModule, RouterOutlet, MatListModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
