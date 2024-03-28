import { Injectable } from '@angular/core';
import { Country } from './country/country.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private localStorageKey = 'countries';

  getCountries(): Country[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveCountries(countries: Country[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(countries));
  }

  deleteCountry(position: number): void {
    let countries = this.getCountries();
    countries = countries.filter((country) => country.position !== position);
    this.saveCountries(countries);
  }
}
