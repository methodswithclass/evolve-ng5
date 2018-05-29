import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UtilityService, shared} from "../../shared/services/utility.service";


export const DEBUG = false;

@Injectable()
export class AppConfig {

	private config = {};

	constructor(private http: Http, private utility: UtilityService) {}

	public get(keys) {

		shared.events.on("getname", () => {

			console.log("get keys", keys);
		})

		// console.log("get config input data", this.config, this.config[$data.config]);
		return this.utility.recursiveObjectLookup({config:this.config, keys:keys});
	}


	public load () {

		this.http.get("../../assets/config.json")
		.map(res => {
			return res.json();
		})
		.catch((error: any):any => {
			return Observable.throw(error.json().error || 'Server error');
		})
		.subscribe((res) => {

			this.config = res;
		})

	}
 }
