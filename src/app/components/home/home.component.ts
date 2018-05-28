import { Component, OnInit } from '@angular/core';


import { StateService } from "@uirouter/angular";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private state: StateService) { }

  ngOnInit() {
  }




  go(state) {


  	this.state.go(state);

  }

}
