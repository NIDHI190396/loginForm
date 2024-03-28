import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, startWith } from 'rxjs';
import { StateDataService } from 'src/app/state/state-data.service';



@Component({
  selector: 'app-city-popup',
  templateUrl: './city-popup.component.html',
  styleUrls: ['./city-popup.component.scss']
})
export class CityPopupComponent implements OnInit {

  addCityForm!: FormGroup;
  data: any;

  countries: any;
  states: any;
  filteredStates: any;

  constructor(public dialog: MatDialogRef<CityPopupComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private stateDataService: StateDataService) {

    this.addCityForm = this.fb.group({
      position: new FormControl(this.dialogData?.position),
      countryId: new FormControl(this.dialogData?.countryId, Validators.required),
      stateId: new FormControl(this.dialogData?.stateId, Validators.required),
      cityName: new FormControl(this.dialogData?.cityName, Validators.required)
    });

    this.data = this.dialogData;

  }

  ngOnInit(): void {
    this.countriesLocalStorage();
    this.statesLocalStorage();

    const countryId = this.dialogData?.countryId || this.addCityForm.get('countryId')?.value;

    this.tempState(countryId);

    this.addCityForm.get('countryId')?.valueChanges.pipe(
      startWith(this.addCityForm.get('countryId')?.value),
      map(value => this.onCountryChange(value))
    ).subscribe();

  }


  countriesLocalStorage(): void {
    const storedCountries = localStorage.getItem('countries');
    this.countries = storedCountries ? JSON.parse(storedCountries) : [];
  }

  statesLocalStorage(): void {
    const storedStates = localStorage.getItem('states');
    this.states = storedStates ? JSON.parse(storedStates) : [];
  }

  onCountryChange(countryId: number): void {
    this.tempState(countryId);

    const selectedCountry = this.countries.find((country: any) => country.position === countryId);

    if (selectedCountry) {
      const countryName = selectedCountry.name;
      this.filteredStates = this.stateDataService.getStates(countryName);
    }
  }


  tempState(countryId: number): void {
    this.filteredStates = this.states.filter((state: any) => state.countryId === countryId);
  }

  getPositionByCountry(country: string): number | null {
    const countryObj = this.countries.find((c: { value: string; }) => c.value === country);
    return countryObj ? countryObj.position : null;
  }


  toSave(): void {
    if (this.addCityForm.valid) {
      const formData = this.addCityForm.value;

      const countryName = this.countries.filter((f: any) => f.position == formData.countryId)[0].name;
      const state = this.states.find((f: any) => f.position == formData.stateId);
      const stateName = state ? state.stateName : '';

      let postModel = {
        position: formData.position,
        countryId: formData.countryId,
        countryName: countryName,
        stateId: formData.stateId,
        stateName: stateName,
        cityName: formData.cityName
      }



      this.dialog.close(postModel);
    }
  }

  toCancel() {
    this.dialog.close();
  }
}
