import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';



// theme 1
import { HomeComponent } from './client/home/home.component';

// theme 2
import { Home2Component } from './client/home-2/home-2.component';


import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { Page404Component } from './admin/page-404/page-404.component';
import { ProsforesComponent } from './admin/prosfores/prosfores.component';
import { ProsforaDetailsComponent } from './admin/prosfora-details/prosfora-details.component';
import { YpiresiesComponent } from './admin/ypiresies/ypiresies.component';
import { AdminContactFormComponent } from './admin/admin-contact-form/admin-contact-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';



const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuardService] },

  { path: 'prosfores', component: ProsforesComponent, canActivate : [AuthGuardService] },
  { path: 'prosfora/:id', component: ProsforaDetailsComponent, canActivate : [AuthGuardService] },

  { path: 'ypiresies', component: YpiresiesComponent, canActivate : [AuthGuardService] },

  { path: 'admin-contact-form', component: AdminContactFormComponent, canActivate : [AuthGuardService] },

  { path: 'admin-products', component: AdminProductsComponent, canActivate : [AuthGuardService] },
  { path: 'admin-settings', component: AdminSettingsComponent, canActivate : [AuthGuardService] },

  { path: 'login', component: LoginComponent},
  { path: 'page-404', component: Page404Component},
  { path: '**', pathMatch: 'full', component: Page404Component }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





