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
var router_1 = require('@angular/router');
var comic_1 = require('./comic');
var comic_service_1 = require('./comic.service');
var ComicComponent = (function () {
    function ComicComponent(comicService, route) {
        this.comicService = comicService;
        this.route = route;
        this.comic = new comic_1.Comic();
        this.PAGE_RANGE = 5;
    }
    ComicComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.currentComic = params['comic'];
            /* the + converts string to a number type */
            _this.currentPage = +params['page'] || 1;
            _this.getComic(_this.currentComic);
        });
    };
    ComicComponent.prototype.getComic = function (currentComic) {
        var _this = this;
        this.comicService
            .getComic(currentComic)
            .then(function (comic) {
            console.log(comic);
            _this.comic = comic;
            _this.comicService
                .getComicChapters(comic.comic_title_url, _this.currentPage)
                .then(function (tuple) {
                console.log(tuple);
                _this.pages = tuple[0];
                _this.numPage = tuple[1];
                // code has be called here for async reasons
                _this.getDisplayPages();
            });
        });
    };
    ComicComponent.prototype.showActiveStyle = function (displayPage) {
        if (this.currentPage == displayPage) {
            return "active";
        }
        else {
            return "";
        }
    };
    // @require should always have at minimum this.PAGE_RANGE amount of pages in db
    ComicComponent.prototype.getDisplayPages = function () {
        this.displayPages = [];
        var page = this.currentPage || 1;
        var upperLimit = Math.floor(this.PAGE_RANGE / 2);
        // count the number of pagination that should be on the right side
        if (this.numPage - page < Math.floor(this.PAGE_RANGE / 2)) {
            upperLimit = this.numPage - page;
        }
        if (page <= Math.floor(this.PAGE_RANGE / 2)) {
            // case: we have less on the left side
            for (var i = 1; i < page; i++) {
                this.displayPages.push(i);
            }
        }
        else {
            // add left side, we subtract 1 to account for the middle
            for (var i = this.PAGE_RANGE - upperLimit - 1; i > 0; i--) {
                this.displayPages.push(page - i);
                console.log("left bar");
            }
        }
        // add middle
        this.displayPages.push(page);
        // fill up remaining right side
        if (this.displayPages.length < this.PAGE_RANGE) {
            var length_1 = this.displayPages.length;
            for (var j = 1; j <= this.PAGE_RANGE - length_1; j++) {
                this.displayPages.push(page + j);
            }
        }
    };
    ComicComponent = __decorate([
        core_1.Component({
            selector: 'comic',
            templateUrl: 'javascripts/app/app.comic.html',
            styleUrls: [
                'javascripts/app/app.comic.css'
            ]
        }), 
        __metadata('design:paramtypes', [comic_service_1.ComicService, router_1.ActivatedRoute])
    ], ComicComponent);
    return ComicComponent;
}());
exports.ComicComponent = ComicComponent;
//# sourceMappingURL=app.comic.js.map