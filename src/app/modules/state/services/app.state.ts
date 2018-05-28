
import { Injectable } from "@angular/core";
import { StateRegistry, StateService } from "@uirouter/angular";



@Injectable()
export class AppState {



	constructor (private registry: StateRegistry, private state: StateService) {}


	addState(state) {

		this.registry.register(state);
	}

	go(loc, params?) {


		console.log("\nnav called", loc, params);

		if (params) {
			console.log("nav with params\n\n", loc, params);
			this.state.go(loc, params);
		}
		else {
			console.log("nav without params\n\n", loc);
			this.state.go(loc);
		}
		
	}

}
