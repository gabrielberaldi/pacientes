import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema-paciente';
 
  constructor(
    private _nbIconLibraries: NbIconLibraries
  ) { 
    this.registerIcons();
  }

  registerIcons(): void { 
    this._nbIconLibraries.registerSvgPack('hero-icons', {
      'edit': 'assets/hero-icons/edit.svg',
    });
    this._nbIconLibraries.setDefaultPack('hero-icons');
  }
  
}
