## npm install --save @angular/material
## npm install --save @angular/animations 
## npm install --save hammerjs
## npm install --save-dev @types/hammerjs
## npm install --save @angular/flex-layout 

## in one line do this
## npm install --save @angular/material @angular/animations hammerjs @angular/flex-layout
## npm install --save-dev @types/hammerjs

## npm i --save @angular/animations@latest


<!--## npm install --save ng2-flex-layout -->

## Μεσα στο @NgModule στα imports array βάλε


```
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


  // Angular Material 2 Setup
  import { MaterialModule } from '@angular/material';
  import 'hammerjs' ; // required for angular material
  import { FlexLayoutModule } from '@angular/flex-layout';
  
  import { AppComponent } from './app.component';




  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      MaterialModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }


```


# style.css

```css

/* You can add global styles to this file, and also import other style files */

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

body {
  margin: 0px;

  font-family: 'Roboto', sans-serif;	
}

*{
  -webkit-font-smoothing: antialased;
  -moz-osx-font-smoothing: antialased;
}

```


## https://admin-panel-2.firebaseapp.com/prosfores

