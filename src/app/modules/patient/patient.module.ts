import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';

const routes: Route[] = [
  { path: 'list', component: PatientListComponent },
  { path: 'edit', component: PatientFormComponent },
  { path: 'edit/:id', component: PatientFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientListComponent,
    PatientFormComponent,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
