import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.scss'],
})
export class ListControlComponent {
  @Input() list: string[] = [];
  @Input() placeholder: string = 'Введите';
  @Input() label: string = '';
  @Output() changeListEvent = new EventEmitter<string[]>();
  public item = new FormControl('');
  constructor() {}

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.item.value && !this.list.includes(this.item.value)) {
      const newList = [...this.list];
      newList.push(this.item.value);
      this.list = newList;
    }
    this.changeListEvent.emit(this.list);
    this.item.setValue('');
  }
  
  onDelete(item: string) {
    const newList = [...this.list];
    const index = this.list.indexOf(item);
    newList.splice(index, 1);
    this.list = newList;
    this.changeListEvent.emit(this.list);
  }
}
