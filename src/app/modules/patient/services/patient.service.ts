import { Injectable } from '@angular/core';
import { BaseIpcService } from '../../../core/services/base-ipc.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseIpcService<any> {

  constructor() {
    super('patient');
  }
}
