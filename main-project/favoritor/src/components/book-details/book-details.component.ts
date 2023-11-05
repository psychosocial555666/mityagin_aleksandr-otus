import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookType } from 'src/common/types';
import { BooksService } from 'src/services/books/books.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: BookType | null = null;
  constructor(
    public sidebarModalService: SidebarModalService,
    public booksService: BooksService,
    public router: Router
  ) {
    this.book = this.booksService.getCurrentBook();
  }

  public editClickHandler() {
    this.router.navigate([
      {
        outlets: {
          modal: ['book', 'edit', this.booksService.getCurrentBook()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_BOOK);
  }
}
