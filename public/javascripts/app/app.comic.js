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
var comic_service_1 = require('./comic.service');
var ComicComponent = (function () {
    function ComicComponent(comicService, route) {
        this.comicService = comicService;
        this.route = route;
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
                _this.numPages = tuple[1];
            });
        });
    };
    ComicComponent = __decorate([
        core_1.Component({
            selector: 'comic',
            templateUrl: 'javascripts/app/app.comic.html'
        }), 
        __metadata('design:paramtypes', [comic_service_1.ComicService, router_1.ActivatedRoute])
    ], ComicComponent);
    return ComicComponent;
}());
exports.ComicComponent = ComicComponent;
//# sourceMappingURL=app.comic.js.map