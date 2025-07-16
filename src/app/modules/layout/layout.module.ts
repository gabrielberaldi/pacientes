import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { 
    path: 'patient', 
    component: LayoutComponent, 
    loadChildren: () => import('../patient/patient.module').then((m) => m.PatientModule) 
  },
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutComponent,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
