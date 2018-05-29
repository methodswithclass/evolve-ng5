import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConfig } from "./services/app.config";


export function loadConfig(config: AppConfig) : Function {

	return () => config.load();

}

@NgModule({
	imports: [
	CommonModule
	],
	declarations: [
	],
	providers:[
	AppConfig,
	{
		provide: APP_INITIALIZER,
		useFactory: loadConfig,
		deps: [AppConfig],
		multi: true
	},
	],
	exports:[
	]
})
export class ConfigModule {


	constructor () {}

}
