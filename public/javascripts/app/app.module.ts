import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { LatestComponent } from './app.latest';
import { GenreComponent } from './app.genre';
import { ComicComponent } from './app.comic';
import { PrivacyComponent } from './app.privacy';
import { TermsComponent } from './app.terms';
import { ContactComponent } from './app.contact';


import { ComicService } from './comic.service';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
  	RouterModule.forRoot([
  		{
  			path: '',
        redirectTo: '/home/1',
        pathMatch: 'full'
  		},
  		{
  			path: 'home/:page',
  			component: LatestComponent
  		},
  		{
  			path: 'genre/:genre/:page',
  			component: GenreComponent
  		},
      {
        path: 'comic/:comic/:page',
        component: ComicComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyComponent
      },
      {
        path: 'terms-of-service',
        component: TermsComponent
      },
      {
        path: 'contact-us',
        component: ContactComponent
      }
  	])
  ],
  declarations: [ 
  	AppComponent,
  	LatestComponent,
  	GenreComponent,
    ComicComponent,
    PrivacyComponent,
    TermsComponent,
    ContactComponent
  ],
  providers: [
  	ComicService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
