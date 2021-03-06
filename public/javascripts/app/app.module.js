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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var app_latest_1 = require('./app.latest');
var app_genre_1 = require('./app.genre');
var app_comic_1 = require('./app.comic');
var app_privacy_1 = require('./app.privacy');
var app_terms_1 = require('./app.terms');
var app_contact_1 = require('./app.contact');
var comic_service_1 = require('./comic.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/home/1',
                        pathMatch: 'full'
                    },
                    {
                        path: 'home/:page',
                        component: app_latest_1.LatestComponent
                    },
                    {
                        path: 'genre/:genre/:page',
                        component: app_genre_1.GenreComponent
                    },
                    {
                        path: 'comic/:comic/:page',
                        component: app_comic_1.ComicComponent
                    },
                    {
                        path: 'privacy-policy',
                        component: app_privacy_1.PrivacyComponent
                    },
                    {
                        path: 'terms-of-service',
                        component: app_terms_1.TermsComponent
                    },
                    {
                        path: 'contact-us',
                        component: app_contact_1.ContactComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                app_latest_1.LatestComponent,
                app_genre_1.GenreComponent,
                app_comic_1.ComicComponent,
                app_privacy_1.PrivacyComponent,
                app_terms_1.TermsComponent,
                app_contact_1.ContactComponent
            ],
            providers: [
                comic_service_1.ComicService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map