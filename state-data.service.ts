import { Injectable } from '@angular/core';
import { State } from './state.component';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {

  private localStorageKey = 'states';

  getStates(country?: string): State[] {
    const storedStates = localStorage.getItem(this.localStorageKey);
    const states = storedStates ? JSON.parse(storedStates) : [];

    if (country) {
      return states.filter((state: State) => state.countryName === country);
    } else {
      return states;
    }
  }

  saveStates(states: State[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(states));
  }

  deleteState(position: number): void {
    const storedStates = localStorage.getItem(this.localStorageKey);

    let states = this.getStates();
    states = states.filter((state) => state.position !== position);
    this.saveStates(states);
  }
}
