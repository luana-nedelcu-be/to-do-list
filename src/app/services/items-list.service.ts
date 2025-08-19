import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsListService {
  private _resetButtonVisible$ = new BehaviorSubject<boolean>(false);

  getResetButtonVisible(): Observable<boolean> {
    return this._resetButtonVisible$.asObservable();
  }

  setResetButtonVisible(visible: boolean): void {
    this._resetButtonVisible$.next(visible);
  }
}
