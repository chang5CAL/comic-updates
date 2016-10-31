import { Component } from '@angular/core';
import { Comic } from './comic';
import { Page } from './page';
import { ComicService } from './comic.service';
@Component({
  selector: 'comic',
  templateUrl: 'javascripts/app/app.comic.html'
})
export class ComicComponent { 
	comic: Comic;
	pages: Page[];
	constructor(
		private comicService: ComicService
	) {}

	getLatestComics(): void {
		this.comicService
			.getComic("Ascendria")
			.then(comic => {
				console.log(comic);
				this.comic = comic;

				this.comicService
					.getComicChapters("Ascendria",1)
					.then(pages => {
						console.log(pages);
						this.pages = pages;
				})
			});

	}


}
