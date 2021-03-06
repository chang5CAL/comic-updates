import { Injectable }    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Comic } from './comic';
import { Page } from './page';

@Injectable()
export class ComicService {
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	/*
	 * Makes a get request to the server to return a list of the latest updated comics
	 * Returns an empty list on invalid input.
	 * @param page: the page number that the user is currently on
	*/
	getLatestComics(page: number): Promise<[Page[], number]> {
		page = page || 1;
		return this.http.get('/api/chapters/' + this.checkPage(page))
			.toPromise()
			.then(response => {
				var res = response.json();
				var list = [res.list, res.numPages];
				return list as [Page[], number]
			})
			.catch(this.handleError);
	}

/*	getNumPages(): Promise<number> {
		return this.http.get('/api/chapters/pageNumber')
			.toPromise()
			.then(response => {
				return response.json().numPage as number
			})
			.catch(this.handleError);
	}*/

	/*
	 * Makes a get request to the server to return a list of comics in a page of a genre
	 * Returns an empty list on invalid input.
	 * @param page: the page number that the user is currently on 
	 * @param genre: the genre that the user is looking for 
	*/
	getGenreList(page: number, genre: string): Promise<[Comic[], number]> {
		return this.http.get('api/genre/' + genre + '/' + this.checkPage(page))
			.toPromise()
			.then(response => {
				var res = response.json();
				var list = [res.list, res.numPages];
				return list as [Comic[], number];
			})
			.catch(this.handleError);
	}

	/*
	 * Makes a get request to the server to return a list pages that are available for a 
	 * current comic series. Returns an empty list on invalid input.
	 * @param comic: the comic that the user is looking at
	 * @param page: the page number that the user is currently on
	*/
	getComicChapters(comic: string, page: number): Promise<[Page[], number]> {
		return this.http.get('api/chapters/' + comic + '/' + this.checkPage(page))
			.toPromise()
			.then(response => {
				var res = response.json();
				var list = [res.list, res.numPages];
				return list as [Page[], number]
			})
			.catch(this.handleError);
	}

	/*
	 * Makes a get request to the server to return the existing comic, returns an empty
	 * object upon failure
	 * @param comic: the comic that the user is looking for
	*/
	getComic(comic: string): Promise<Comic> {
		return this.http.get('api/comic/' + comic)
			.toPromise()
			.then(response => response.json() as Comic)
			.catch(this.handleError);
	}

	getGenreTypeList(): Promise<String[]> {
		return this.http.get('api/genres/')
			.toPromise()
			.then(response => response.json() as String[])
			.catch(this.handleError);
	}

	private checkPage(page: number): number {
		if (page == null) {
			return 1;
		}
		return page;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}