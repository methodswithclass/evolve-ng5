import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from "@angular/http";


import { StateModule } from "./modules/state/state.module";
import { ConfigModule } from "./modules/config/config.module";
import { SharedModule } from "./modules/shared/shared.module";


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FeedbackComponent } from './components/demos/feedback/feedback.component';
import { TrashComponent } from './components/demos/trash/trash.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		FeedbackComponent,
		TrashComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		StateModule,
		ConfigModule,
		SharedModule
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
