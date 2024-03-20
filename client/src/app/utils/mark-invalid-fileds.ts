/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

/** пометить некорректно заполненные контролы */
export function markInvalidFields(form: AbstractControl, invalidFields: string[] = []): string[] {
    if (!(form instanceof FormGroup || form instanceof FormArray)) {
        return invalidFields;
    }
    Object.keys(form.controls).forEach((key) => {
        const controls = form.controls as any;
        if (controls[key].invalid) {
            if (controls[key] instanceof FormGroup) {
                markInvalidFields(controls[key] as FormGroup, invalidFields);
            }
            if (controls[key] instanceof FormArray) {
                controls[key].controls.forEach((control: any) =>
                    markInvalidFields(control, invalidFields),
                );
            }
            if (controls[key] instanceof FormControl) {
                controls[key].markAsDirty();
                invalidFields.push(key);
            }
        }
    });
    return invalidFields;
}
