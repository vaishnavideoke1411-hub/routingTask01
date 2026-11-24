import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loadingStatus$ : BehaviorSubject<boolean> = new BehaviorSubject(false)

  loader$ : Observable<boolean> = this.loadingStatus$.asObservable()

  constructor() { }

  show(){

    this.loadingStatus$.next(true)

  }

  hide(){
    this.loadingStatus$.next(false)
  }
}
