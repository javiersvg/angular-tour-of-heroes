import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './hero/heroes/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { TohDashboardComponent } from './toh-dashboard/toh-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TohDashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
