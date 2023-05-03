import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() id: string = 'star';
  @Output() changeRatingEvent = new EventEmitter<number>();

  ratings: number[] = [5, 4, 3, 2, 1];

  constructor() {}

  onChange(event: any): void {
    this.changeRatingEvent.emit(event.target.value)
  }
}
