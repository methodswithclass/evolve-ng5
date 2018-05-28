import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityService } from "./services/utility.service";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers:[
		UtilityService
	],
	exports:[
	]
})
export class SharedModule { }
