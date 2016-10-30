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

	getLatestComics(): void { //This is not the same as the function below it. Delete this note later.
		this.comicService
			.getGenreList(1, "Fantasy") //Get it to accept different numbers eventually. Also, check if the genre is case sensitive
			.then(comics => { //Shortened Anonymous function
				console.log(comics);
				this.comics = comics;
			});
	}


}