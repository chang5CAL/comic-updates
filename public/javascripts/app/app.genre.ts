import { Component } from '@angular/core';
import { Comic } from './comic';
import { ComicService } from './comic.service';
@Component({
  selector: 'genre',
  templateUrl: 'javascripts/app/app.genre.html'
})
export class GenreComponent { 
	comics: Comic[];
	constructor(
		private comicService: ComicService
	) {}

	getLatestComics(): void {
		this.comicService
			.getLatestComics(1)
			.then(comics => {
				console.log(comics);
				this.comics = comics;
			});
	}


}
