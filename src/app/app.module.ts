import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';


import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { DisplayComponent } from './display/display.component';
import { TileComponent } from './tile/tile.component';

import { DictionaryService } from './services/dictionary.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DisplayComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService, DictionaryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
