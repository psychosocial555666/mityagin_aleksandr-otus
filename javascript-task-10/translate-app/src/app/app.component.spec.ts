import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { GoComponent } from 'src/components/go/go.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';
import { RecentlyAddedComponent } from 'src/components/recently-added/recently-added.component';
import { SetiingsComponent } from 'src/components/setiings/setiings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        RecentlyAddedComponent,
        GoComponent,
        SetiingsComponent,
        HeaderComponent,
        NotFoundComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
