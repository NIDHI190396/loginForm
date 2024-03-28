import { Injectable } from '@angular/core';
import { City } from './city.component';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {

  private localStorageKey = 'cities';

  getCities(data:any): City[] {
    const storedData = data;
    return storedData ? storedData : [];
  }


  saveCities(cities: City[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cities));
  }

  deleteCity(position: number): void {
    const storedData = localStorage.getItem(this.localStorageKey);

    let cities = this.getCities(storedData ? storedData : []);
    cities = cities.filter((city) => city.position !== position);
    this.saveCities(cities);
  }


}
