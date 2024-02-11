import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent && reverse) {
            const c = control.parent.get(matchTo) as AbstractControl;
            if (c) {
                c.updateValueAndValidity();
            }
            return null;
        }
        return !!control.parent &&
            !!control.parent.value &&
            control.value === control.parent.get(matchTo)?.value
            ? null
            : { matching: true };
    };
}
