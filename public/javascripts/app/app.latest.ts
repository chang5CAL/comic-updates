import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Page } from './page';
import { ComicService } from './comic.service';

@Component({
  selector: 'latest',
  templateUrl: 'javascripts/app/app.latest.html',
  styleUrls: [
  	'javascripts/app/app.latest.css'
  ]
})
export class LatestComponent implements OnInit { 
	pages: Page[];
	numPage: number;

	constructor(
		private comicService: ComicService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let page = +params['page'];
			this.getLatestComics(page);
		});
	}

	getLatestComics(page: number): void {
		this.comicService
			.getLatestComics(page)
			.then(tuple => {
				console.log(tuple);
				this.pages = tuple[0];
				this.numPage = tuple[1];
			});
	}

/*	getNumPages(): void {
		this.comicService
			.getNumPages()
			.then(numPage => {
				console.log(numPage);
				this.numPage = numPage;
			});
	}
*/
}
