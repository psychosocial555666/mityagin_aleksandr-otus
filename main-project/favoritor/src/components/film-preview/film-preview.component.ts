import { Component } from '@angular/core';
import { FilmsService } from 'src/services/films/films.service';

@Component({
  selector: 'app-film-preview',
  templateUrl: './film-preview.component.html',
  styleUrls: ['./film-preview.component.scss'],
})
export class FilmPreviewComponent {
  constructor(public filmsService: FilmsService) {}
}
