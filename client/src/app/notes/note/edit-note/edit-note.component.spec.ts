import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNoteComponent } from './edit-note.component';
import { NotesService } from '@api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NoteDto } from '@api/models/note-dto';

describe('NoteComponent', () => {
    let component: EditNoteComponent;
    let fixture: ComponentFixture<EditNoteComponent>;
    let notesService: NotesService;
    let fakeNotesService: jasmine.SpyObj<NotesService>;
    const provideId: { params: Observable<any> } = {
        params: of({ id: 1 }),
    };
    const provideNoId: { params: Observable<any> } = {
        params: of({}),
    };
    const noteMock: NoteDto = {
        id: 1,
        name: 'test',
        isFavorite: false,
    };

    describe('when edit component', () => {
        beforeEach(async () => {
            fakeNotesService = jasmine.createSpyObj(notesService, ['readNote', 'updateNote']);
            fakeNotesService.readNote.and.returnValue(of(noteMock));
            fakeNotesService.updateNote.and.returnValue(of());
            await TestBed.configureTestingModule({
                imports: [EditNoteComponent],
                providers: [
                    { provide: NotesService, useValue: fakeNotesService },
                    { provide: ActivatedRoute, useValue: provideId },
                    Router,
                ],
            }).compileComponents();
            fixture = TestBed.createComponent(EditNoteComponent);
            component = fixture.componentInstance;
            component.noteForm.patchValue({
                name: 'name',
            });
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should set noteId', () => {
            expect(component.noteId).toBe(1);
        });

        it('should update note', () => {
            component.sendForm();

            expect(fakeNotesService.updateNote).toHaveBeenCalledTimes(1);
        });
    });

    describe('when new component', () => {
        beforeEach(async () => {
            fakeNotesService = jasmine.createSpyObj(notesService, ['createNote']);
            fakeNotesService.createNote.and.returnValue(of(2));
            await TestBed.configureTestingModule({
                imports: [EditNoteComponent],
                providers: [
                    { provide: NotesService, useValue: fakeNotesService },
                    { provide: ActivatedRoute, useValue: provideNoId },
                    Router,
                ],
            }).compileComponents();
            fixture = TestBed.createComponent(EditNoteComponent);
            component = fixture.componentInstance;
            component.noteForm.patchValue({
                name: 'name',
            });
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should not set noteId', () => {
            expect(component.noteId).toBeUndefined();
        });

        it('should create note', () => {
            component.sendForm();

            expect(fakeNotesService.createNote).toHaveBeenCalledTimes(1);
        });
    });
});
