import { Component } from '@angular/core';
import { BooksService } from 'src/services/books/books.service';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent {
  constructor(public booksService: BooksService) {}

}
