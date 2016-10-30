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
var comic_service_1 = require('./comic.service');
var ComicComponent = (function () {
    function ComicComponent(comicService) {
        this.comicService = comicService;
    }
    ComicComponent.prototype.getLatestComics = function () {
        var _this = this;
        this.comicService
            .getComic("Ascendria")
            .then(function (comic) {
            console.log(comic);
            _this.comic = comic;
            _this.comicService
                .getComicChapters("Ascendria", 1)
                .then(function (pages) {
                console.log(pages);
                _this.pages = pages;
            });
        });
    };
    ComicComponent = __decorate([
        core_1.Component({
            selector: 'comic',
            templateUrl: 'javascripts/app/app.comic.html'
        }), 
        __metadata('design:paramtypes', [comic_service_1.ComicService])
    ], ComicComponent);
    return ComicComponent;
}());
exports.ComicComponent = ComicComponent;
//# sourceMappingURL=app.comic.js.map