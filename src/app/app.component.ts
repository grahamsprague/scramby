import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  data_service;
  view_mode;
  current_view;
  constructor(private data: DataService ) {
    console.log('constructor is running.');
    this.data_service = data;
    console.log(this.data_service);

    console.log('oninit is running.');
    this.data_service.viewModeComponentMessage.subscribe(
      message => {
         this.view_mode = message;
         console.log('start was clicked.' + this.view_mode);

         this.handleViewModeChange(this.view_mode);

     });


  }

  handleViewModeChange(mode) {
    this.current_view = 'display';
    // if ( mode === 'default message' ) {
    //   this.current_view = 'start';
    // } else if ( mode === 'display' ) {
    //   this.current_view = 'display';
    // }
  }


  ngOnInit() {
    // this is not working.
    // moved code to constructor
  }


}
