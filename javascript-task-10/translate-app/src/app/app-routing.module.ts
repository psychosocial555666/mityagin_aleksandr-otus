import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoComponent } from 'src/components/go/go.component';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';
import { RecentlyAddedComponent } from 'src/components/recently-added/recently-added.component';
import { SetiingsComponent } from 'src/components/setiings/setiings.component';

const routes: Routes = [
  { path: '', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SetiingsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
