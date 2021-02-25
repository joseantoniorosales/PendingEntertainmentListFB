import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module')
                          .then( m => m.ListPageModule),
                          canActivate: [AngularFireAuthGuard],
                          data: { authGuardPipe: redirectUnauthorizedToLogin }                      
  },
  {
    path: 'create-item',
    loadChildren: () => import('./pages/form/form.module')
                          .then( m => m.FormPageModule),
                          canActivate: [AngularFireAuthGuard],
                          data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'edit-item/:id',
    loadChildren: () => import('./pages/form/form.module')
                          .then( m => m.FormPageModule),
                          canActivate: [AngularFireAuthGuard],
                          data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  },

  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
