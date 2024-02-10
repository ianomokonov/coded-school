import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenderEnum } from '@shared/enums/gender.enum';
import { DestroyService } from '@core/destroy.service';
import { PassportUserDto } from '@api/models/passport-user-dto';

@Component({
    selector: 'coded-account-data',
    standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        CardModule,
        DropdownModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
    ],
    providers: [DestroyService],
    templateUrl: './account-data.component.html',
    styleUrl: './account-data.component.scss',
})
export class AccountDataComponent implements OnInit {
    @Input({ required: true })
    passportData!: PassportUserDto;

    @Output()
    onSaveButtonClick: EventEmitter<PassportUserDto> = new EventEmitter<PassportUserDto>();

    passportForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.passportForm = this.fb.group({
            firstName: ['', Validators.required],
            secondName: [''],
            surname: [''],
            birthDate: [null],
            gender: [GenderEnum.UNSET],
            country: [''],
            city: [''],
        });
    }

    ngOnInit(): void {
        this.passportForm.patchValue({
            ...this.passportData,
            birthDate: this.passportData.birthDate ? new Date(this.passportData.birthDate) : '',
        });
    }

    getGenderValues(): Record<string, string>[] {
        return [
            {
                label: 'Мужской',
                value: GenderEnum.MALE,
            },
            {
                label: 'Женский',
                value: GenderEnum.FEMALE,
            },
            {
                label: 'Не указан',
                value: GenderEnum.UNSET,
            },
        ];
    }

    dateFormat(date: Date): void {
        this.passportForm.patchValue({
            birthDate: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
        });
    }

    saveUser(): void {
        if (this.passportForm.invalid) return;
        this.onSaveButtonClick.emit(this.passportForm.getRawValue());
    }
}
