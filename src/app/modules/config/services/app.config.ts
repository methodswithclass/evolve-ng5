import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UtilityService } from "../../shared/services/utility.service";


export interface Wrapper {

	data:any
}

export const DEBUG = false;

let data = {};
let timer = {};
let hasBeenConfigured = {};
let count = 0;

@Injectable()
export class AppConfig {

	private config = {};
	private $options = [];
	private count = 0;


	constructor(private http: Http, private utility: UtilityService) {}


	private configure(options) {

		data[options.name] = options.callback();

		// console.log("configure callback data", data[options.name]);
		if (data[options.name]) {
			hasBeenConfigured[options.name] = true;
			return data[options.name];
		}
		else {
			hasBeenConfigured[options.name] = false;
			return null;
		}
	}


	public setup(options) : Promise<Wrapper> {

		return new Promise ((resolve, reject) => {

			let self = this;

			clearInterval(timer[options.name]);
			timer[options.name] = null;
			data[options.name] = null;
			hasBeenConfigured[options.name] = false;

			timer[options.name] = setInterval(() => {
				
				if (hasBeenConfigured[options.name] || count >= 500) {

					this.stopSetup(options);

					count = 0;

					if (count < 500) {
						resolve({data:data[options.name]});
					}
					else {
						resolve({data:{config:"none"}});
					}
				}
				else {
					data[options.name] = self.configure(options);
					count++;
				}
				
			}, 100)

		});
	}

	private stopSetup(options) {

		clearInterval(timer[options.name]);
		timer[options.name] = null;
	}


	public addOptions(options) {

		this.$options.push(options);
	}

	public get($data) {

		// console.log("get config input data", this.config, this.config[$data.config]);
		return this.utility.recursiveObjectLookup({config:this.config[$data.config ? $data.config : $data.name], keys:$data.keys});
	}

	public load() {

		this.$options.forEach((value, index) => {

			this.apiCall(value);
		})
	}

	public apiCall (options) {

		let self = this;

		return new Promise((resolve, reject) => {

			// console.log("module", options ? options.name : "none", "configUrl", options ? options.url : "")

			self.http.get(options.url)
			.map(res => {
				return res.json();
			})
			.catch((error: any):any => {
				return Observable.throw(error.json().error || 'Server error');
			}).subscribe((res) => {

				self.config[options.name] = res;

				if (self.config[options.name]) {
					resolve(true);
				}
			});

		});
	}
 }
