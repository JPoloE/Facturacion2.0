import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private checkboxesSource = new BehaviorSubject<{ label: string, checked: boolean }[]>([]);
  currentCheckboxes = this.checkboxesSource.asObservable();

  updateCheckboxes(checkboxes: { label: string, checked: boolean }[]) {
    this.checkboxesSource.next(checkboxes);
  }
}
