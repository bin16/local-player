import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {

  @Input() max: number = 100
  @Input() min: number = 0
  @Input() value: number = 0
  @Output() updated: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  willChange(x, w: number) {
    const { min, max } = this
    const value = (max - min) * (x / w) + min
    this.updated.emit(value)
  }

  get progress(): number {
    return this.value / (this.max - this.min)
  }

  get percent(): string {
    return (this.progress * 100).toFixed(2).toString() + "%"
  }

}
