

import { UIRouterModule, UIRouter, StateRegistry, StateService } from "@uirouter/angular";

import { HomeComponent } from '../../../components/home/home.component';
import { FeedbackComponent } from '../../../components/demos/feedback/feedback.component';
import { TrashComponent } from '../../../components/demos/trash/trash.component';



var APP_STATES = [
{
	name:"root",
	url:"",
	redirect:"home"
},
{
	name:"home",
	url:"/",
	component:HomeComponent
},
{
	name:"feedback",
	url:"/feedback",
	component:FeedbackComponent
},
{
	name:"trash",
	url:"/trash",
	component:TrashComponent
}
]



export const states = UIRouterModule.forRoot({
	states: APP_STATES,
	useHash: false,
	otherwise:{state:"home"}
})
