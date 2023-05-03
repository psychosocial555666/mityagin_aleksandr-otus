import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-info',
  templateUrl: './rating-info.component.html',
  styleUrls: ['./rating-info.component.scss'],
})
export class RatingInfoComponent {
  @Input() rating: number = 0;
  ratings: number[] = [1, 2, 3, 4, 5];
}
