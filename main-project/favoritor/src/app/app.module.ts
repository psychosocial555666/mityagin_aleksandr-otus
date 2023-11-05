import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from '../components/login/login.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MainScreenComponent } from 'src/components/main-screen/main-screen.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  featherUserPlus,
  featherSearch,
  featherUser,
  featherLogOut,
  featherMusic,
  featherBook,
  featherFilm,
  featherXCircle,
  featherCheckCircle,
  featherAlertCircle,
  featherArrowRightCircle,
  featherEdit,
  featherSave,
  featherTrash2,
  featherPlus,
  featherLink,
} from '@ng-icons/feather-icons';
import { FilmsComponent } from 'src/components/films/films.component';
import { BooksComponent } from '../components/books/books.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserEditComponent } from '../components/user-edit/user-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { FilmCardComponent } from '../components/film-card/film-card.component';
import { FilmFormComponent } from '../components/film-form/film-form.component';
import { RatingComponent } from '../components/rating/rating.component';
import { SidebarModalComponent } from 'src/components/sidebar-modal/sidebar-modal.component';
import { FilmDetailsComponent } from 'src/components/film-details/film-details.component';
import { RatingInfoComponent } from '../components/rating-info/rating-info.component';
import { AddFilmComponent } from '../components/add-film/add-film.component';
import { BookCardComponent } from '../components/book-card/book-card.component';
import { BookAddComponent } from '../components/book-add/book-add.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { BookFormComponent } from '../components/book-form/book-form.component';
import { AlbumsComponent } from '../components/albums/albums.component';
import { AlbumCardComponent } from 'src/components/album-card/album-card.component';
import { AlbumDetailsComponent } from 'src/components/album-details/album-details.component';
import { AlbumFormComponent } from 'src/components/album-form/album-form.component';
import { AlbumAddComponent } from '../components/album-add/album-add.component';
import { ListControlComponent } from '../components/list-control/list-control.component';
import { FilmPreviewComponent } from '../components/film-preview/film-preview.component';
import { BookPreviewComponent } from '../components/book-preview/book-preview.component';
import { AlbumPreviewComponent } from '../components/album-preview/album-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainScreenComponent,
    HeaderComponent,
    SidebarComponent,
    FilmsComponent,
    BooksComponent,
    SignupComponent,
    UserEditComponent,
    SnackbarComponent,
    FilmCardComponent,
    FilmFormComponent,
    RatingComponent,
    SidebarModalComponent,
    FilmDetailsComponent,
    RatingInfoComponent,
    AddFilmComponent,
    BookCardComponent,
    BookAddComponent,
    BookDetailsComponent,
    BookFormComponent,
    AlbumsComponent,
    AlbumCardComponent,
    AlbumDetailsComponent,
    AlbumFormComponent,
    AlbumAddComponent,
    ListControlComponent,
    FilmPreviewComponent,
    BookPreviewComponent,
    AlbumPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgIconsModule.withIcons({
      featherUserPlus,
      featherSearch,
      featherUser,
      featherLogOut,
      featherMusic,
      featherBook,
      featherFilm,
      featherXCircle,
      featherCheckCircle,
      featherAlertCircle,
      featherArrowRightCircle,
      featherEdit,
      featherSave,
      featherPlus,
      featherTrash2,
      featherLink,
    }),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
