import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskDirective),
      multi: true, 
    },
  ],
})
export class PhoneMaskDirective implements ControlValueAccessor {

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const cleanValue = this._getCleanValue(value);
    const formattedValue = this._formatPhoneNumber(cleanValue);
    this._el.nativeElement.value = formattedValue;
    this._onChange(cleanValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this._onTouched();
  }

  private _onChange: (value: string) => void = () => { };
  private _onTouched: () => void = () => { };

  constructor(private _el: ElementRef<HTMLInputElement>) { }

  writeValue(value: string): void {
    const formattedValue = this._formatPhoneNumber(value || '');
    this._el.nativeElement.value = formattedValue;
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
 
  setDisabledState?(isDisabled: boolean): void {
    this._el.nativeElement.disabled = isDisabled;
  }

  private _getCleanValue(value: string): string {
    return value.replace(/\D/g, '').substring(0, 11);
  }

  private _formatPhoneNumber(digits: string): string {
    const length = digits.length;
    if (!length) return '';
    if (length <= 2) return `(${digits}`;
    if (length <= 7) return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
  }
}
