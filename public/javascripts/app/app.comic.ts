import { Component } from '@angular/core';
import { Comic } from './comic';
import { ComicService } from './comic.service';
@Component({
  selector: 'comic',
  templateUrl: 'javascripts/app/app.genre.html'
})
export class ComicComponent { 
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
