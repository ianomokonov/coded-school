import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCabinetComponent } from './lk.component';

describe('LkComponent', () => {
    let component: PersonalCabinetComponent;
    let fixture: ComponentFixture<PersonalCabinetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PersonalCabinetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PersonalCabinetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
