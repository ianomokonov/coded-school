import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNoteComponent } from './edit-note.component';
import { NotesService } from '@api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NoteDto } from '@api/models/note-dto';
import { FileUploadService } from '@app/services/file-upload.service';

describe('NoteComponent', () => {
    let component: EditNoteComponent;
    let fixture: ComponentFixture<EditNoteComponent>;
    let notesService: NotesService;
    let filesUploadService: FileUploadService;
    let fakeNotesService: jasmine.SpyObj<NotesService>;
    let fakeFilesUploadService: jasmine.SpyObj<FileUploadService>;
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
            fakeFilesUploadService = jasmine.createSpyObj(filesUploadService, ['createNote', 'updateNote']);
            fakeNotesService.readNote.and.returnValue(of(noteMock));
            fakeNotesService.updateNote.and.returnValue(of());
            fakeFilesUploadService.updateNote.and.returnValue(of());
            fakeFilesUploadService.createNote.and.returnValue(of());
            await TestBed.configureTestingModule({
                imports: [EditNoteComponent],
                providers: [
                    { provide: NotesService, useValue: fakeNotesService },
                    { provide: FileUploadService, useValue: fakeFilesUploadService },
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

        it('should update note', () => {
            component.sendForm();

            expect(fakeFilesUploadService.updateNote).toHaveBeenCalledTimes(1);
        });
    });

    describe('when new component', () => {
        beforeEach(async () => {
            fakeNotesService = jasmine.createSpyObj(notesService, ['createNote']);
            fakeFilesUploadService = jasmine.createSpyObj(filesUploadService, ['createNote', 'updateNote']);
            fakeNotesService.createNote.and.returnValue(of(2));
            fakeFilesUploadService.updateNote.and.returnValue(of());
            fakeFilesUploadService.createNote.and.returnValue(of());
            await TestBed.configureTestingModule({
                imports: [EditNoteComponent],
                providers: [
                    { provide: NotesService, useValue: fakeNotesService },
                    { provide: FileUploadService, useValue: fakeFilesUploadService },
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

        it('should create note', () => {
            component.sendForm();

            expect(fakeFilesUploadService.createNote).toHaveBeenCalledTimes(1);
        });
    });
});
