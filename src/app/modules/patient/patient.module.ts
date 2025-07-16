import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientEditComponent } from './pages/patient-edit/patient-edit.component';

const routes: Route[] = [
  { path: 'list', component: PatientListComponent },
  { path: 'edit', component: PatientEditComponent },
  { path: 'edit:id', component: PatientEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }
