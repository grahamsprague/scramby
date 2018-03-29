import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  data_service;
  constructor(data: DataService) {
    this.data_service = data;
   }

  start(args) {
    this.data_service.changeViewMode(args);
  }

  ngOnInit() {
  }

}
