import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() inputId?: string;

  @Input() varient: 'input' | 'button' = 'input';

  @Input() pickerVarient: 'floating' | 'stacked' = 'floating';

  @Input() pickerParent = '';

  @Input() stepper = 1;

  @Input() isTwelveHourFormat = false;

  @Input() enableSeconds = false;

  @Input() dataId?: string;

  @Input() value = '';

  @Input() label = '';

  @Input() placeholder = '';

  @Input() hasError = false;

  @Output() handleOnChange: EventEmitter<string> = new EventEmitter();

  @Output() handleOnBlur: EventEmitter<boolean> = new EventEmitter();

  @Input() disabled = false;

  @ViewChild('hour') hourRef?: ElementRef;

  @ViewChild('minute') minuteRef?: ElementRef;

  @ViewChild('second') secondRef?: ElementRef;

  @ViewChild('amPm') amPmRef?: ElementRef;

  isOpen = false;

  minDate = new Date();

  maxDate = new Date();

  hour?: Swiper;

  minute?: Swiper;

  second?: Swiper;

  amPm?: Swiper;

  hourList: string[] = [];

  minuteList: string[] = [];

  secondList: string[] = [];

  amPmList: string[] = [];

  selectedHour = '00';

  selectedMinute = '00';

  selectedSecond = '';

  selectedAmPm = '';

  pickerParentEl = null;

  previousOpenClass = '';

  currentTimeout: any = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.minDate.setHours(0, 0, 0, 0);

    this.maxDate.setHours(23, 59, 59, 999);

    this.generateHours(this.minDate, this.maxDate);

    this.generateMinutes();

    if (this.pickerVarient === 'stacked') {
      this.addStackParentStyle();
    }

    if (this.enableSeconds) {
      this.generateSeconds();
    }

    if (this.isTwelveHourFormat) {
      this.generateAmPm(this.minDate, this.maxDate);
    }
  }

  ngAfterViewInit(): void {
    this.hour = this.hourRef?.nativeElement.swiper;
    this.minute = this.minuteRef?.nativeElement.swiper;

    if (this.enableSeconds) {
      this.second = this.secondRef?.nativeElement.swiper;
    }

    if (this.isTwelveHourFormat) {
      this.amPm = this.amPmRef?.nativeElement.swiper;
    }

    if (this.value) {
      this.setInitialValue();
    }
  }

  generateHours(min: Date, max: Date) {
    const hourItems: string[] = [];
    const minHours = min.getHours();
    const maxHours = max.getHours();
    let hoursCount = this.isTwelveHourFormat ? 13 : 24;
    hoursCount /= 1;

    if (hoursCount > 1) {
      const startIndex = this.isTwelveHourFormat ? 1 : 0;
      // eslint-disable-next-line no-plusplus
      for (let hourIndex = startIndex; hourIndex < 24; hourIndex++) {
        let hours = hourIndex * 1;
        if (hours >= minHours && hours <= maxHours) {
          hours = this.isTwelveHourFormat ? this.toTwelveHourFormat(hours) : hours;
          if (!hourItems.find((element) => Number(element) === hours)) {
            const leadZero = hours < 10 ? `0${hours}` : `${hours}`;
            hourItems.push(leadZero);
          }
        }
      }
    } else {
      hourItems.push('0');
    }

    this.hourList = hourItems;
  }

  generateMinutes() {
    const minuteItems = [];
    const minuteItemsCount = 60 / this.stepper;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < minuteItemsCount; i++) {
      const minutes = i * this.stepper < 10 ? `0${i * this.stepper}` : `${i * this.stepper}`;

      minuteItems.push(minutes);
    }

    this.minuteList = minuteItems;
  }

  generateSeconds() {
    const secondItems = [];
    const secondItemsCount = 60 / 1;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < secondItemsCount; i++) {
      const seconds = i * this.stepper < 10 ? `0${i * this.stepper}` : `${i * this.stepper}`;

      secondItems.push(seconds);
    }

    this.secondList = secondItems;
  }

  generateAmPm(min: Date, max: Date) {
    const ampmItems: string[] = [];
    const minHour = min.getHours();
    const maxHour = max.getHours();

    if (minHour < 12) {
      ampmItems.push('AM');
    }

    if (minHour >= 12 || maxHour >= 12) {
      ampmItems.push('PM');
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      ampmItems.push('');
    }

    this.amPmList = ampmItems;
  }

  toTwelveHourFormat(hour: number): number {
    let time = hour;
    if (time > 12) {
      time -= 12;
    } else if (hour === 0) {
      time = 12;
    }

    return time;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  setInitialValue() {
    const hour = this.formatTime(this.isTwelveHourFormat ? 'hh' : 'HH');
    const minute = this.formatTime('mm');
    const second = this.formatTime('ss');
    const amPm = this.formatTime('aa');

    this.selectedHour = hour;
    this.selectedMinute = minute;

    this.hour?.slideTo(this.hourList.findIndex((x) => x === hour));
    this.minute?.slideTo(this.minuteList.findIndex((x) => x === minute));

    if (this.enableSeconds) {
      this.selectedSecond = second;
      this.second?.slideTo(this.secondList.findIndex((x) => x === second));
    }

    if (this.isTwelveHourFormat) {
      this.selectedAmPm = amPm;
      this.amPm?.slideTo(this.amPmList.findIndex((x) => x === amPm));
    }
  }

  setTime(hours: string, minutes: string, seconds?: string, amPm?: string) {
    let value = `${hours}:${minutes}`;

    if (seconds) {
      value = `${value}:${seconds}`;
    }

    if (amPm) {
      value = `${value} ${amPm}`;
    }

    return value;
  }

  formatTime(stamp: string) {
    return format(parseISO(`${format(new Date(), 'yyyy-MM-dd')} ${this.value}`), stamp);
  }

  onChange: (value: string) => void = () => {
    // Field on change logic goes here
  };

  onTouched: () => void = () => {
    // Field on blur logic goes here
  };

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleChange(value: string) {
    this.value = value;

    this.onChange(value);
    this.handleOnChange.emit(value);
  }

  handleTouch() {
    this.handleOnBlur.emit(true);
    this.onTouched();
  }

  handleHourChange() {
    if (this.hour) {
      this.selectedHour = this.hourList.find((h, i) => i === this.hour?.activeIndex) || '00';
      const value = this.setTime(this.selectedHour, this.selectedMinute, this.selectedSecond, this.selectedAmPm);

      this.cancelTimeout();
      this.currentTimeout = setTimeout(() => {
        this.handleChange(value);
      }, 800);
    }
  }

  handleMinuteChange() {
    if (this.minute && this.minute.activeIndex) {
      this.selectedMinute = this.minuteList.find((m, i) => i === this.minute?.activeIndex) || '00';
      const value = this.setTime(this.selectedHour, this.selectedMinute, this.selectedSecond, this.selectedAmPm);

      this.cancelTimeout();
      this.currentTimeout = setTimeout(() => {
        this.handleChange(value);
      }, 800);
    }
  }

  handleSecondChange() {
    if (this.second) {
      this.selectedSecond = this.secondList.find((m, i) => i === this.second?.activeIndex) || '00';
      const value = this.setTime(this.selectedHour, this.selectedMinute, this.selectedSecond, this.selectedAmPm);

      this.cancelTimeout();
      this.currentTimeout = setTimeout(() => {
        this.handleChange(value);
      }, 800);
    }
  }

  handleAmPmChange() {
    if (this.amPm) {
      this.selectedAmPm = this.amPmList.find((x, i) => i === this.amPm?.activeIndex) || 'AM';
      const value = this.setTime(this.selectedHour, this.selectedMinute, this.selectedSecond, this.selectedAmPm);

      this.cancelTimeout();
      this.currentTimeout = setTimeout(() => {
        this.handleChange(value);
      }, 800);
    }
  }

  cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }

  handleTogglePicker() {
    this.isOpen = !this.isOpen;

    if (this.pickerVarient === 'stacked') {
      if (this.isOpen) {
        const className = `picker-open-${Math.random().toFixed(4)}`; // generate a dynamic class so it doesnt clash with other open timepicker with same parent

        this.previousOpenClass = className;
        this.renderer.addClass(this.pickerParentEl, this.previousOpenClass);
      } else {
        this.renderer.removeClass(this.pickerParentEl, this.previousOpenClass);
        this.previousOpenClass = '';
      }
    }
  }

  addStackParentStyle() {
    let parentElement = null;

    if (this.pickerParent) {
      parentElement = document.querySelector(this.pickerParent);
    } else {
      parentElement = this.elementRef.nativeElement.parentElement;
    }

    this.pickerParentEl = parentElement;

    this.renderer.addClass(parentElement, 'picker-parent');
  }

  closePicker() {
    this.isOpen = false;
    this.renderer.removeClass(this.pickerParentEl, 'picker-open');
  }
}
