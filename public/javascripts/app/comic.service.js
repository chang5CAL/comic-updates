"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ComicService = (function () {
    function ComicService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    /*
     * Makes a get request to the server to return a list of the latest updated comics
     * Returns an empty list on invalid input.
     * @param page: the page number that the user is currently on
    */
    ComicService.prototype.getLatestComics = function (page) {
        page = page || 1;
        return this.http.get('/api/chapters/' + this.checkPage(page))
            .toPromise()
            .then(function (response) {
            var res = response.json();
            var list = [res.list, res.numPages];
            return list;
        })
            .catch(this.handleError);
    };
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
    ComicService.prototype.getGenreList = function (page, genre) {
        return this.http.get('api/genre/' + genre + '/' + this.checkPage(page))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /*
     * Makes a get request to the server to return a list pages that are available for a
     * current comic series. Returns an empty list on invalid input.
     * @param comic: the comic that the user is looking at
     * @param page: the page number that the user is currently on
    */
    ComicService.prototype.getComicChapters = function (comic, page) {
        return this.http.get('api/chapters/' + comic + '/' + this.checkPage(page))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /*
     * Makes a get request to the server to return the existing comic, returns an empty
     * object upon failure
     * @param comic: the comic that the user is looking for
    */
    ComicService.prototype.getComic = function (comic) {
        return this.http.get('api/comic/' + comic)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ComicService.prototype.checkPage = function (page) {
        if (page == null) {
            return 1;
        }
        return page;
    };
    ComicService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ComicService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ComicService);
    return ComicService;
}());
exports.ComicService = ComicService;
//# sourceMappingURL=comic.service.js.map