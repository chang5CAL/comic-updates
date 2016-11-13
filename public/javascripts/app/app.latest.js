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
var LatestComponent = (function () {
    function LatestComponent(comicService, route) {
        this.comicService = comicService;
        this.route = route;
    }
    LatestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var page = +params['page'];
            _this.getLatestComics(page);
        });
    };
    LatestComponent.prototype.getLatestComics = function (page) {
        var _this = this;
        this.comicService
            .getLatestComics(page)
            .then(function (tuple) {
            console.log(tuple);
            _this.pages = tuple[0];
            _this.numPage = tuple[1];
        });
    };
    LatestComponent = __decorate([
        core_1.Component({
            selector: 'latest',
            templateUrl: 'javascripts/app/app.latest.html',
            styleUrls: [
                'javascripts/app/app.latest.css'
            ]
        }), 
        __metadata('design:paramtypes', [comic_service_1.ComicService, router_1.ActivatedRoute])
    ], LatestComponent);
    return LatestComponent;
}());
exports.LatestComponent = LatestComponent;
//# sourceMappingURL=app.latest.js.map