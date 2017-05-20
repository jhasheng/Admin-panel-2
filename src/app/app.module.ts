import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


// ********************** ANGULAR MATERIAL 2 ********************* //
import { MaterialModule } from '@angular/material';
import 'hammerjs' ; // required for angular material


// ********************** ROUTING ********************* //
import { AppRoutingModule } from './app-routing.module';

// ********************** SERVICES ********************* //
import { FirebaseService } from './services/firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

// ********************** ENVIROMENT ********************* //
import { environment } from '../environments/environment.prod';


// ********************** GUARDS ********************* //
import { AuthGuardService } from './services/auth-guard.service';


import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { Page404Component } from './admin/page-404/page-404.component';
import { DialogComponent } from './dialog/dialog.component';


import { ProsforesComponent } from './admin/prosfores/prosfores.component';
import { DialogAddProsforaComponent } from './admin/dialog-add-prosfora/dialog-add-prosfora.component';
import { DialogeDeleteProsforaComponent } from './admin/dialoge-delete-prosfora/dialoge-delete-prosfora.component';
import { NavigationMenuLeftComponent } from './admin/navigation-menu-left/navigation-menu-left.component';
import { MainToolbarComponent } from './admin/main-toolbar/main-toolbar.component';
import { ProsforesTableComponent } from './admin/prosfores-table/prosfores-table.component';
import { ProsforaDetailsComponent } from './admin/prosfora-details/prosfora-details.component';
import { YpiresiesComponent } from './admin/ypiresies/ypiresies.component';

import { HomeComponent } from './client/home/home.component';
import { AdminContactFormComponent } from './admin/admin-contact-form/admin-contact-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { Home2Component } from './client/home-2/home-2.component';


// const firebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Popup
// };



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    Page404Component,
    DialogComponent,
    ProsforesComponent,
    DialogAddProsforaComponent,
    DialogeDeleteProsforaComponent,
    NavigationMenuLeftComponent,
    MainToolbarComponent,
    ProsforesTableComponent,
    ProsforaDetailsComponent,
    YpiresiesComponent,
    HomeComponent,
    AdminContactFormComponent,
    AdminProductsComponent,
    AdminSettingsComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firabaseConfig),
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireAuth, AngularFireDatabase, FirebaseService, AuthGuardService],
  entryComponents: [DialogComponent, DialogAddProsforaComponent, DialogeDeleteProsforaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
