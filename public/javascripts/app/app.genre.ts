import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Comic } from './comic';
import { Page } from './page';
import { ComicService } from './comic.service';

@Component({
  selector: 'genre',
  templateUrl: 'javascripts/app/app.genre.html'
})
export class GenreComponent { 
	comic: Comic = new Comic();
	pages: Page[];
	comics: Comic[];
	currentPage: number;
	currentGenre: string;
	numPage: number;
	displayPages: number[];

	private PAGE_RANGE: number = 5;

	constructor(
		private comicService: ComicService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.currentGenre = params['genre'] || "";
			/* the + converts string to a number type */
			this.currentPage = +params['page'] || 1;
			this.getGenre(this.currentGenre);
		});
	}

	getGenre(currentGenre: string): void { //This is not the same as the function below it. Delete this note later.
		this.comicService
			.getGenreList(1, currentGenre) //Get it to accept different numbers eventually. Also, check if the genre is case sensitive
			.then(tuple => { //Shortened Anonymous function
				this.comics = tuple[0];
				this.numPage = tuple[1];
				console.log(tuple);
				this.getDisplayPages();
			});
	}

	showActiveStyle(displayPage: number): string {
		if (this.currentPage == displayPage) {
			return "active";
		} else {
			return "";
		}
	}

	// @require should always have at minimum this.PAGE_RANGE amount of pages in db
	getDisplayPages(): void {
		this.displayPages = [];
		let page = this.currentPage || 1;
		let upperLimit = Math.floor(this.PAGE_RANGE / 2);
		
		// count the number of pagination that should be on the right side
		if (this.numPage - page < Math.floor(this.PAGE_RANGE / 2)) {
			upperLimit = this.numPage - page;
		}

		if (page <= Math.floor(this.PAGE_RANGE / 2)) {
			// case: we have less on the left side
			for (let i = 1; i < page; i++) {
				this.displayPages.push(i);
			}
		} else {
			// add left side, we subtract 1 to account for the middle
			for (let i = this.PAGE_RANGE - upperLimit - 1; i > 0; i--) {
				this.displayPages.push(page - i);
				console.log("left bar");
			}
		}
		// add middle
		this.displayPages.push(page);

		// fill up remaining right side
		if (this.displayPages.length < this.PAGE_RANGE) {
			let length = this.displayPages.length;
			for (let j = 1; j <= this.PAGE_RANGE - length; j++) {
				this.displayPages.push(page + j);	
			}
		}
	}

}