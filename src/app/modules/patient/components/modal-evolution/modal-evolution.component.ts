import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogRef, NbInputModule } from '@nebular/theme';
import { Evolution } from '../../models/evolution.model';

@Component({
  selector: 'app-modal-evolution',
  standalone: true,
  imports: [NbCardModule, NbButtonModule, ReactiveFormsModule, NbInputModule, NbDatepickerModule,],
  templateUrl: './modal-evolution.component.html',
  styleUrl: './modal-evolution.component.scss'
})
export class ModalEvolutionComponent implements OnInit {

  @Input({ required: true }) title: string = ''
  @Input() evolution!: Evolution;

  formGroup = this._fb.group({
    id: [null as number | null],
    date: ['', Validators.required],
    text: ['', Validators.required]
  })

  constructor(
    private _dialogRef: NbDialogRef<ModalEvolutionComponent>,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!!this.evolution) {
      this.formGroup.patchValue(this.evolution);
    }
  }

  save(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    };
    this._dialogRef.close(this.formGroup);
  }

  close(): void {
    this._dialogRef.close();
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

}
