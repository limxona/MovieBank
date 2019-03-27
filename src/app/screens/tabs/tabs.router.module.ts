import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          },
          { 
            path: 'movie-detail/:movieID', 
            children: [
              {
                path: '',
                loadChildren: '../movie-detail/movie-detail.module#MovieDetailPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            loadChildren: '../category/category.module#CategoryPageModule'
          },
          { 
            path: 'search-list/:genderID/:genderName', 
            children: [
              {
                path: '',
                loadChildren: '../search-list/search-list.module#SearchListPageModule'
              }
            ]
          },
          { 
            path: 'movie-detail/:movieID', 
            children: [
              {
                path: '',
                loadChildren: '../movie-detail/movie-detail.module#MovieDetailPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../search/search.module#SearchPageModule'
          },
          { 
            path: 'movie-detail/:movieID', 
            children: [
              {
                path: '',
                loadChildren: '../movie-detail/movie-detail.module#MovieDetailPageModule'
              }
            ]
          }
        ]
      }, 
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: '../favorites/favorites.module#FavoritesPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
