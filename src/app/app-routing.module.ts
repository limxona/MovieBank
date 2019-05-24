import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './screens/tabs/tabs.module#TabsPageModule' },
  { path: 'search-list', loadChildren: './screens/search-list/search-list.module#SearchListPageModule' },
  { path: 'add-list', loadChildren: './screens/modals/add-list/add-list.module#AddListPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
