import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DemoLibModule} from "@sundarit2007/demo-lib-sudoku";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DemoLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
