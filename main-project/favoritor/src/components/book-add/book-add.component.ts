import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { newBook } from 'src/common/const';
import { BooksService } from 'src/services/books/books.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public router: Router,
    public booksService: BooksService
  ) {}

  public addClickHandler() {
    this.booksService.setCurrentBook(newBook);
    this.router.navigate([{ outlets: { modal: ['book', 'edit', '-1'] } }]);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.NEW_BOOK);
  }
}
