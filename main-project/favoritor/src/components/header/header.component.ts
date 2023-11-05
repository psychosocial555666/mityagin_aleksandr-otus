import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlbumsService } from 'src/services/albums/albums.service';
import { BooksService } from 'src/services/books/books.service';
import { FilmsService } from 'src/services/films/films.service';
import { MainService } from 'src/services/main/main.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  search = new FormControl('');
  constructor(
    public userService: UserService,
    public mainService: MainService,
    public filmsService: FilmsService,
    public booksService: BooksService,
    public albumsService: AlbumsService,
  ) {}

  onSubmit(event: SubmitEvent | Event) {
    event.preventDefault();
    this.mainService.setSearch(this.search.value || '');
    this.filmsService.filterFilms();
    this.booksService.filterBooks();
    this.albumsService.filterAlbums();
  }
}
