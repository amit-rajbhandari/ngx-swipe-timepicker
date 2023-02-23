import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimePickerModule } from './timepicker/timepicker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TimePickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
