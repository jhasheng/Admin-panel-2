import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';



// main - entry component
import { AppComponent } from './app.component';
import { Page404Component } from './page-404/page-404.component';

// client-pages
import { HomeComponent } from './client/home/home.component';

// admin-pages
import { DashboardComponent } from './admin/admin-pages/dashboard/dashboard.component';
import { LoginComponent } from './admin/admin-pages/login/login.component';
import { ProsforesComponent } from './admin/admin-pages/prosfores/prosfores.component';
import { ProsforaDetailsComponent } from './admin/admin-pages/prosfora-details/prosfora-details.component';
import { YpiresiesComponent } from './admin/admin-pages/ypiresies/ypiresies.component';
import { AdminProductsComponent } from './admin/admin-pages/admin-products/admin-products.component';
import { AdminSettingsComponent } from './admin/admin-pages/admin-settings/admin-settings.component';
import { AdminMapComponent } from './admin/admin-pages/admin-map/admin-map.component';





const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'home', component: HomeComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuardService] },

  { path: 'prosfores', component: ProsforesComponent, canActivate : [AuthGuardService] },
  { path: 'prosfora/:id', component: ProsforaDetailsComponent, canActivate : [AuthGuardService] },

  { path: 'ypiresies', component: YpiresiesComponent, canActivate : [AuthGuardService] },

  { path: 'admin-map', component: AdminMapComponent, canActivate : [AuthGuardService] },

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





