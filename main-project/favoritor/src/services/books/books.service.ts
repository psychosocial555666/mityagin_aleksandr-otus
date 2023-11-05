import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  ShortBookType,
  BookType,
  BookInputType,
  ExternalBookType,
} from 'src/common/types';
import { filterBySearch } from 'src/common/utils';
import { MainService } from '../main/main.service';
import {
  MODAL_TITLES,
  SidebarModalService,
} from '../sidebar-modal/sidebar-modal.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  CREATE_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  GET_BOOK_BY_ID,
  UPDATE_BOOK,
} from './books.queries';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: ShortBookType[] = [];
  private filteredBooks: ShortBookType[] = [];
  private currentBook: BookType | null = null;
  public list: ExternalBookType[] = [];
  public isDataLoading: boolean = false;
  constructor(
    private apollo: Apollo,
    private snackbarService: SnackbarService,
    private mainService: MainService,
    private sidebarModalService: SidebarModalService,
    public router: Router
  ) {}

  setBooks(books: ShortBookType[]): void {
    this.books = books;
    this.filterBooks();
  }

  setFiltered(books: ShortBookType[]) {
    this.filteredBooks = books;
  }

  getBooks(): ShortBookType[] {
    return this.books;
  }

  getFiltered(): ShortBookType[] {
    return this.filteredBooks;
  }

  setCurrentBook(book: BookType | null): void {
    this.currentBook = book;
  }

  getCurrentBook() {
    return this.currentBook;
  }

  updateCurrentBook(input: BookInputType): void {
    const result = { ...this.currentBook, ...input } as BookType;
    this.setCurrentBook(result);
  }

  includeBook(book: ShortBookType): void {
    const result = [...this.books];
    result.push(book);
    this.setBooks(result);
  }

  excludeBook(id: string): void {
    this.setBooks(this.books.filter((book) => book.id !== id));
  }

  updateBooksWithBook(book: ShortBookType): void {
    const index = this.books.findIndex((b) => b.id === book.id);
    const result = [...this.books];
    result.splice(index, 1, book);
    this.setBooks(result);
  }

  requestBooks() {
    this.apollo
      .query({
        query: GET_BOOKS,
      })
      .subscribe({
        next: (value: any) => {
          const { getBooks } = value.data;
          this.setBooks(getBooks);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  filterBooks() {
    const filtered = this.books.filter((book) =>
      filterBySearch(book, this.mainService.search)
    );
    this.setFiltered(filtered);
  }

  requestBookById(id: string) {
    this.apollo
      .query({
        query: GET_BOOK_BY_ID,
        variables: {
          bookId: id,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { getBookById } = value.data;
          this.setCurrentBook(getBookById);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  createBook(bookData: BookInputType) {
    this.apollo
      .mutate({
        mutation: CREATE_BOOK,
        variables: {
          bookData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { book, error } = value.data.createBook;
          if (book) {
            this.snackbarService.showSnackBar('success', 'Готово!');
            this.setCurrentBook(book);
            this.includeBook(book);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  updateBook(bookData: BookInputType) {
    this.apollo
      .mutate({
        mutation: UPDATE_BOOK,
        variables: {
          bookData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { book, error } = value.data.updateBook;
          if (book) {
            this.snackbarService.showSnackBar('success', 'Изменено');
            this.setCurrentBook(book);
            this.updateBooksWithBook(book);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  deleteBook(deleteBookId: string) {
    this.apollo
      .mutate({
        mutation: DELETE_BOOK,
        variables: {
          deleteBookId,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { deleted, error } = value.data?.deleteBook;
          if (deleted) {
            this.snackbarService.showSnackBar('success', 'Удалено');
            this.setCurrentBook(null);
            this.excludeBook(deleteBookId);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  getGoogleDataByName() {
    this.isDataLoading = true;
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        this.getCurrentBook()?.name || ''
      } ${this.getCurrentBook()?.author || ''}&printType=books`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.items) {
          this.snackbarService.showSnackBar('error', 'Данные не найдены');
          this.isDataLoading = false;
          return;
        }
        this.list = json.items.map((item: any) => ({
          bookId: item.id,
          name: item.volumeInfo.title,
          logo:
            item.volumeInfo.imageLinks?.medium ||
            item.volumeInfo.imageLinks?.thumbnail ||
            null,
          author: item.volumeInfo?.authors?.[0],
          description: item.volumeInfo.description,
        }));
      })
      .catch((err) => console.log(err));
  }

  onBookSelect(bookId: number) {
    const data = this.list.find((item: any) => item.bookId === bookId);
    this.updateCurrentBook(data as BookInputType);
    this.enableEdit();
    this.list = [];
    this.isDataLoading = false;
  }

  onListClose() {
    this.list = [];
    this.isDataLoading = false;
  }

  enableEdit() {
    this.router.navigate([
      {
        outlets: {
          modal: ['book', 'edit', this.getCurrentBook()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_BOOK);
  }
}
