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
import { Page404Component } from './page-404/page-404.component';



// admin-pages
import { DashboardComponent } from './admin/admin-pages/dashboard/dashboard.component';
import { LoginComponent } from './admin/admin-pages/login/login.component';
import { ProsforesComponent } from './admin/admin-pages/prosfores/prosfores.component';
import { ProsforaDetailsComponent } from './admin/admin-pages/prosfora-details/prosfora-details.component';
import { YpiresiesComponent } from './admin/admin-pages/ypiresies/ypiresies.component';
import { AdminProductsComponent } from './admin/admin-pages/admin-products/admin-products.component';
import { AdminSettingsComponent } from './admin/admin-pages/admin-settings/admin-settings.component';



// admin-parts
import { DialogComponent } from './admin/admin-parts/dialog/dialog.component';
import { DialogAddProsforaComponent } from './admin/admin-parts/dialog-add-prosfora/dialog-add-prosfora.component';
import { DialogeDeleteProsforaComponent } from './admin/admin-parts/dialoge-delete-prosfora/dialoge-delete-prosfora.component';
import { NavigationMenuLeftComponent } from './admin/admin-parts/navigation-menu-left/navigation-menu-left.component';
import { MainToolbarComponent } from './admin/admin-parts/main-toolbar/main-toolbar.component';
import { ProsforesTableComponent } from './admin/admin-parts/prosfores-table/prosfores-table.component';



// client-pages
import { HomeComponent } from './client/home/home.component';
import { AdminMapComponent } from './admin/admin-pages/admin-map/admin-map.component';
import { MediaSliderComponent } from './client/client-parts/media-slider/media-slider.component';




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
    AdminProductsComponent,
    AdminSettingsComponent,
    AdminMapComponent,
    MediaSliderComponent
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
