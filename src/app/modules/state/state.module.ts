import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UIRouterModule } from "@uirouter/angular";

import { states } from "./services/states";
import { AppState } from "./services/app.state";

@NgModule({
	imports: [
		CommonModule,
		UIRouterModule,
		states
	],
	declarations: [],
	providers:[
		AppState
	],
	exports:[
		UIRouterModule
	]
})
export class StateModule { }
