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
} from '@ng-icons/feather-icons';
import { FilmsComponent } from 'src/components/films/films.component';
import { BooksComponent } from '../components/books/books.component';
import { MusicComponent } from '../components/music/music.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainScreenComponent,
    HeaderComponent,
    SidebarComponent,
    FilmsComponent,
    BooksComponent,
    MusicComponent,
    SignupComponent,
    UserEditComponent,
    SnackbarComponent,
    FilmCardComponent,
    FilmFormComponent,
    RatingComponent,
    SidebarModalComponent,
    FilmDetailsComponent,
    RatingInfoComponent,
    AddFilmComponent
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
    }),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
