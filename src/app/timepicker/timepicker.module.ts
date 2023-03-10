import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { ClickOutsideModule } from '../click-outside/click-outside.module';
import { TimePickerComponent } from './timepicker.component';

register();
@NgModule({
  declarations: [TimePickerComponent],
  imports: [CommonModule, FormsModule, ClickOutsideModule],
  exports: [TimePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimePickerModule {}
