import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NbButtonModule, NbIconModule, NbLayoutModule, NbMenuItem, NbMenuModule, NbSidebarModule } from '@nebular/theme';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet, RouterModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbIconModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

   menuItems: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/layout/dashboard',
    },
    {
      title: 'Pacientes',
      icon: 'people-outline',
      link: '/layout/patient',
      pathMatch: 'prefix'
    },
    {
      title: 'Documentos',
      icon: 'file-text-outline',
      link: '/layout',
    },
    {
      title: 'Configurações',
      icon: 'settings-outline',
      link: '/layout',
    }
  ]

  constructor(private router: Router) {}

}
