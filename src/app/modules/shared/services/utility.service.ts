import { Injectable } from '@angular/core';

import * as $ from 'jquery';


const monthNames = [
"January", "February", "March",
"April", "May", "June", "July",
"August", "September", "October",
"November", "December"
]

@Injectable()
export class UtilityService {



	constructor() { }


	processImg (_img, parent) {

		var $img = [];

		if (Array.isArray && !Array.isArray(_img)) {
			$img.push(_img);
		}
		else {
			$img = _img;
		}


		return $img.map((image, index) => {


			var frameWidth = parent.width
			var frameHeight = parent.height;

			var width = $(image).width();
			var height = $(image).height();
			var aspect = width/height;

			var h = frameHeight;
			var w = h*aspect;

			if ((aspect < 1 && h >= frameHeight && w >= frameWidth) || (aspect >= 1 && h < frameHeight && w > frameWidth)) {

				w = frameWidth;
				h = w/aspect;
			}


			$(image).css({width:w + "px", height:h + "px"});

			return image;
		})


	}


	getMonth (date) {

		return monthNames[date.getMonth()];
	}


	printDate(date) {

		return this.getMonth(date) + " " + date.getDate() + ", " + this.resolveYear(date.getYear()) + " " + this.resolveHours(date.getHours()) + ":" + this.resolveMinutes(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM")

	}

	resolveYear (year) {

		return 1900 + year;
	}

	resolveMinutes (minutes) {

		return minutes < 10 ? "0" + minutes : "" + minutes;
	}

	resolveHours (hours) {

		console.log("hours", hours);

		return hours > 12 ? hours - 12 : hours;

	}


	recursiveObjectLookup(data) {



		let keyArray;
		let $key = "";
		let newObj = {};

		let prop = (obj, index) => {

			if (obj) {

				if (keyArray.length > 1) {

					if (index < keyArray.length-1) {

						$key = keyArray[index]

						if (obj.hasOwnProperty($key)) {

							newObj = obj[$key];

							return prop(newObj, index+1);
						}
						else {
							// console.log("the module configuration for", data.name, "has no property", $key, "in", obj);
							return obj[keyArray[0]];
						}

					}
					else {
						
						$key = keyArray[index]

						// console.log("the module configuration for", data.name, "has reached it's search depth for key series", keyArray, "returning last value", obj[$key], "for key", $key);

						if (obj.hasOwnProperty($key)) {

							return obj[$key];
						}
						else {
							// console.log("the module configuration for", data.name, "has no property", $key, "in", obj);
							return obj[keyArray[0]];
						}
					}

				}
				else if (obj.hasOwnProperty(keyArray[0])) {

					return obj[keyArray[0]];
				}
				else {
					// console.log("the module configuration for", data.name, "does not have the property", keyArray);
					return obj[0];
				}

			}
			else {
				// console.log("the module configuration for", data.name, "does not have a config object");
			}

		}


		keyArray = data.keys.split(".");

		// console.log("the module configuration has these keys", keyArray, "with this config", data.config);

		if (data.config) {

			return prop(data.config, 0);
		}
		else {

			// console.log("the module configuration does not exist, returning full request data", data);
			return data
		}
	}

}
