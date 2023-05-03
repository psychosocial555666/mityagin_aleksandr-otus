import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from 'src/components/books/books.component';
import { FilmDetailsComponent } from 'src/components/film-details/film-details.component';
import { FilmFormComponent } from 'src/components/film-form/film-form.component';
import { FilmsComponent } from 'src/components/films/films.component';
import { LoginComponent } from 'src/components/login/login.component';
import { MainScreenComponent } from 'src/components/main-screen/main-screen.component';
import { MusicComponent } from 'src/components/music/music.component';
import { SidebarModalComponent } from 'src/components/sidebar-modal/sidebar-modal.component';
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
      { path: 'music', component: MusicComponent },
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
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
