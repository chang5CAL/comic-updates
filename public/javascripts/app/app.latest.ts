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
	currentPage: number;

	constructor(
		private comicService: ComicService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.currentPage = +params['page'];
			this.getLatestComics(this.currentPage);
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
}
