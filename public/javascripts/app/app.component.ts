import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  templateUrl: 'javascripts/app/app.component.html'
})

@NgModule({
	declarations: [AppComponent],
	imports: [NgbModule.forRoot()],
	bootstrap: [AppComponent]

})

export class AppComponent { }
export class AppModule {

}