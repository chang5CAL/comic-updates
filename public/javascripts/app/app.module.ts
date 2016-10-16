import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { LatestComponent } from './app.latest';
import { GenreComponent } from './app.genre';

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
  			path: 'random',
  			component: GenreComponent
  		}
  	])
  ],
  declarations: [ 
  	AppComponent,
  	LatestComponent,
  	GenreComponent
  ],
  providers: [
  	ComicService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
