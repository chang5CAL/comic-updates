import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
	currentPage: number;
	currentComic: string;
	numPages: number;

	constructor(
		private comicService: ComicService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.currentComic = params['comic'];
			/* the + converts string to a number type */
			this.currentPage = +params['page'] || 1;
			this.getComic(this.currentComic);
		});
	}

	getComic(currentComic: string): void {
		this.comicService
			.getComic(currentComic)
			.then(comic => {
				console.log(comic);
				this.comic = comic;

				this.comicService
					.getComicChapters(comic.comic_title_url, this.currentPage)
					.then(tuple => {
						console.log(tuple);
						this.pages = tuple[0];
						this.numPages = tuple[1];
				})
			});

	}


}
