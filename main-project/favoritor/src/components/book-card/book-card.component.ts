import { Component } from '@angular/core';
import { BooksService } from 'src/services/books/books.service';
import { MainService } from 'src/services/main/main.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public booksService: BooksService,
    public mainService: MainService
  ) {}

  openBookCardHandler(id: string | undefined): void {
    if (!id) return;
    this.booksService.requestBookById(id);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.setTitle(MODAL_TITLES.ABOUT_BOOK);
  }
}
