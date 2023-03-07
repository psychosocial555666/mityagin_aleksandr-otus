import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecentlyAddedComponent } from '../components/recently-added/recently-added.component';
import { GoComponent } from '../components/go/go.component';
import { SetiingsComponent } from '../components/setiings/setiings.component';
import { HeaderComponent } from '../components/header/header.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedComponent,
    GoComponent,
    SetiingsComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
