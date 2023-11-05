import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/services/albums/albums.service';
import { BooksService } from 'src/services/books/books.service';
import { FilmsService } from 'src/services/films/films.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  constructor(
    public filmsService: FilmsService,
    public albumsService: AlbumsService,
    public booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.filmsService.requestFilms();
    this.booksService.requestBooks();
    this.albumsService.requestAlbums();
  }
}
