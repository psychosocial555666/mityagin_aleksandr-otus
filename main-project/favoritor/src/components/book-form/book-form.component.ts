import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/services/books/books.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  bookEditForm;
  constructor(
    private formBuilder: FormBuilder,
    public booksService: BooksService,
    private http: HttpClient,
    public router: Router,
    public sidebarModalService: SidebarModalService,
    private snackbarService: SnackbarService
  ) {
    const book = booksService.getCurrentBook();
    this.bookEditForm = this.formBuilder.group({
      name: new FormControl(book?.name || '', [Validators.required]),
      genre: new FormControl(book?.genre || ''),
      author: new FormControl(book?.author || ''),
      description: new FormControl(book?.description || ''),
      impressions: new FormControl(book?.impressions || ''),
    });
  }

  onLogoUpload(target: EventTarget | null) {
    const tar = target as HTMLInputElement;
    const file: File | undefined = tar?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('logo', file);
      const upload$ = this.http.post('http://localhost:4000/books', formData);
      upload$.subscribe({
        next: (data: any) => {
          const url = 'http://localhost:4000/' + data.url;
          this.booksService.updateCurrentBook({ logo: url });
          this.snackbarService.showSnackBar('success', 'Загружено');
        },
        error: (error) => this.snackbarService.showSnackBar('error', error),
      });
    }
  }

  onSubmit(): void {
    let currentBook = this.booksService.getCurrentBook();
    let bookData = {
      ...this.bookEditForm.value,
      logo: currentBook?.logo,
      rating: Number(currentBook?.rating),
    };
    if (currentBook?.id !== '-1') {
      this.booksService.updateBook({...bookData, id: currentBook?.id });
    } else {
      this.booksService.createBook(bookData);
    }
    this.sidebarModalService.disableEditing();
    this.backClick();
  }

  onDelete(): void {
    let currentBook = this.booksService.getCurrentBook();
    if (currentBook?.id) {
      this.booksService.deleteBook(currentBook?.id);
    }
    this.sidebarModalService.setEditClosed();
  }

  public updateRating(rating: number) {
    this.booksService.updateCurrentBook({ rating });
  }

  public editClickHandler() {
    this.router.navigate([{ outlets: { modal: ['book', 'edit', this.booksService.getCurrentBook()?.id ] }}]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_BOOK);
  }

  public backClick() {
    if (this.booksService.getCurrentBook()?.id === '-1') {
      this.sidebarModalService.setClosed();
    }
    else {
      this.sidebarModalService.setEditClosed();
    }
  }
}
