import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './screens/home/home.module#HomePageModule' },
]; */

const routes: Routes = [
  { path: '', loadChildren: './screens/tabs/tabs.module#TabsPageModule' },
  { path: 'search', loadChildren: './screens/search/search.module#SearchPageModule' },
  { path: 'profile', loadChildren: './screens/profile/profile.module#ProfilePageModule' },
  { path: 'favorites', loadChildren: './screens/favorites/favorites.module#FavoritesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
