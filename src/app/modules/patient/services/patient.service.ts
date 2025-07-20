import { Injectable } from '@angular/core';
import { BaseIpcService } from '../../../core/services/base-ipc.service';
import { Patient } from '../models/patient.model';
import { PatientList } from '../models/patient-list.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseIpcService<Patient, PatientList> {

  constructor() {
    super('patient');
  }
}
