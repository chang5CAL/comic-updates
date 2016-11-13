import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Page } from './page';
import { ComicService } from './comic.service';

@Component({
  selector: 'latest',
  templateUrl: 'javascripts/app/app.latest.html'
})
export class LatestComponent implements OnInit { 
	pages: Page[];

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
			.then(pages => {
				console.log(pages);
				this.pages = pages;
			});
	}
}
