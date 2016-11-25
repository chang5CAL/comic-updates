import { Component, OnInit } from '@angular/core';
import { ComicService } from './comic.service';

@Component({
  selector: 'my-app',
  templateUrl: 'javascripts/app/app.component.html',
  styleUrls: [
  	'javascripts/app/app.component.css',
  ]
})

export class AppComponent { 
	genreList: String[];

	constructor(
		private comicService: ComicService,
	) {}

	ngOnInit(): void {
		this.getGenreList();
	}

	getGenreList() {
		this.comicService.getGenreTypeList()
			.then(list => {
				this.genreList = list;
			});
	}
}