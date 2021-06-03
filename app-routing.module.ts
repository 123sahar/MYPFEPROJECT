import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'page1',
    loadChildren: () => import('./page1/page1.module').then( m => m.Page1PageModule)
  },
  
  {
    path: 'commercial-profil',
    loadChildren: () => import('./commercial-profil/commercial-profil.module').then( m => m.CommercialProfilPageModule)
  },
  {
    path: 'type-de-user',
    loadChildren: () => import('./type-de-user/type-de-user.module').then( m => m.TypeDeUserPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./compte/compte.module').then( m => m.ComptePageModule)
  },
  {
    path: 'user-profil',
    loadChildren: () => import('./user-profil/user-profil.module').then( m => m.UserProfilPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'societe',
    loadChildren: () => import('./societe/societe.module').then( m => m.SocietePageModule)
  },
  {
    path: 'authentification-societe',
    loadChildren: () => import('./societe/societe/authentification-societe/authentification-societe.module').then( m => m.AuthentificationSocietePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
