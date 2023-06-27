import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from 'src/components/album-details/album-details.component';
import { AlbumFormComponent } from 'src/components/album-form/album-form.component';
import { AlbumsComponent } from 'src/components/albums/albums.component';
import { BookDetailsComponent } from 'src/components/book-details/book-details.component';
import { BookFormComponent } from 'src/components/book-form/book-form.component';
import { BooksComponent } from 'src/components/books/books.component';
import { FilmDetailsComponent } from 'src/components/film-details/film-details.component';
import { FilmFormComponent } from 'src/components/film-form/film-form.component';
import { FilmsComponent } from 'src/components/films/films.component';
import { LoginComponent } from 'src/components/login/login.component';
import { MainScreenComponent } from 'src/components/main-screen/main-screen.component';
import { SignupComponent } from 'src/components/signup/signup.component';
import { UserEditComponent } from 'src/components/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main',
    component: MainScreenComponent,
    children: [
      {
        path: 'films',
        component: FilmsComponent,
      },
      { path: 'books', component: BooksComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'user-edit', component: UserEditComponent },
    ],
  },
  {
    path: 'film/:id',
    component: FilmDetailsComponent,
    outlet: 'modal',
    title: 'About',
    data: { title: 'About' },
  },
  {
    path: 'film/edit/:id',
    component: FilmFormComponent,
    outlet: 'modal',
    title: 'Edit',
    data: { title: 'Edit' },
  },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    outlet: 'modal',
    title: 'About',
    data: { title: 'About' },
  },
  {
    path: 'book/edit/:id',
    component: BookFormComponent,
    outlet: 'modal',
    title: 'Edit',
    data: { title: 'Edit' },
  },
  {
    path: 'album/:id',
    component: AlbumDetailsComponent,
    outlet: 'modal',
    title: 'About',
    data: { title: 'About' },
  },
  {
    path: 'album/edit/:id',
    component: AlbumFormComponent,
    outlet: 'modal',
    title: 'Edit',
    data: { title: 'Edit' },
  },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
