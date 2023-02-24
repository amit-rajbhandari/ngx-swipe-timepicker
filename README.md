# ngx-swipe-timepicker

ngx-swipe-timepicker is a custom timepicker for Angular that allows users to select a time by swiping or scrolling through hours and minutes. The timepicker is built using [Swiper JS](https://swiperjs.com/element) for the swipe/scroll functionality and [Tailwind CSS](https://tailwindcss.com/) for styling.

Please try it out and feel free to modify as required. :)

## Features
* Swipe/scroll functionality for selecting a time
* 24-hour time format support
* Step feature support
* UI inspiration from IOS timepicker

## Usage
Import the NgxSwipeTimepickerModule in your app.module.ts file:
```typescript
// app.module.ts file
import { NgxSwipeTimepickerModule } from '<path/to/ngx-swipe-timepicker/component>';

@NgModule({
  imports: [
    // ...
    NgxSwipeTimepickerModule,
  ],
  // ...
})
export class AppModule { }
```
Add the timepicker component to your template:
```html
<ngx-swipe-timepicker></ngx-swipe-timepicker>
```

## Configuration
You can customize the timepicker by passing options to the ngx-swipe-timepicker component:
```html
<ngx-swipe-timepicker
    varient="input" // button or input
    [enableSeconds]="true" // Enables Seconds swiper in picker
    [isTwelveHourFormat]="true" // Enables 12 hour format in picker
    [stepper]="15" // step for minutes and seconds
    pickerParent="#input-stack-picker" // Selector for picker to be position at.
    pickerVarient="stacked" // stacked or floating
    label="Simple Picker"
    placeholder="Simple Picker"
    value="00:00" // default value
    [hasError]="false" // can be used for input validation
></ngx-swipe-timepicker>
```