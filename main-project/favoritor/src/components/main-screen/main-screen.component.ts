import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/services/films/films.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  constructor(public filmsService: FilmsService) {}
  ngOnInit(): void {
    this.filmsService.requestFilms();
  }
}
