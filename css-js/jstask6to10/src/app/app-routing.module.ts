import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { componentFactoryName } from '@angular/compiler';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './home/article-list/article-list.component';
import { ArticleNewlyIncreasedComponent } from './home/article-newly-increased/article-newly-increased.component';
import { WellcomeComponent } from './home/wellcome/wellcome.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'wellcome', component: WellcomeComponent },
      {
        path: 'list',
        component: ArticleListComponent,
        runGuardsAndResolvers: 'paramsChange'
      },
      { path: 'newly', component: ArticleNewlyIncreasedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
