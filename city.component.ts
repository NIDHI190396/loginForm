import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CityPopupComponent } from './city-popup/city-popup.component';
import { CityDataService } from './city-data.service';


export interface City {
  position: number;
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
  cityName: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {

  dataSource!: MatTableDataSource<City>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  constructor(public dialog: MatDialog, private cityDataService: CityDataService) { }

  displayedColumns: string[] = ['position', 'countryId', 'countryName', 'stateId', 'stateName', 'cityName', 'action'];
  city: City[] = [
    { position: 1, countryId: 1, countryName: 'India', stateId: 1, stateName: 'Gujarat', cityName: 'Surat' },
    { position: 2, countryId: 2, countryName: 'Russia', stateId: 2, stateName: 'Amur', cityName: 'Moscow' },
    { position: 3, countryId: 3, countryName: 'Canada', stateId: 3, stateName: 'Alberta', cityName: 'Toronto' },
    { position: 4, countryId: 4, countryName: 'US', stateId: 4, stateName: 'California', cityName: 'New York' },
    { position: 5, countryId: 5, countryName: 'Switzerland', stateId: 5, stateName: 'Bern', cityName: 'Geneva' },
    { position: 6, countryId: 6, countryName: 'India', stateId: 6, stateName: 'Maharashtra', cityName: 'Mumbai' },
    { position: 7, countryId: 7, countryName: 'Russia', stateId: 7, stateName: 'Altai', cityName: 'Shebalino' },
    { position: 8, countryId: 8, countryName: 'Canada', stateId: 8, stateName: 'Manitoba', cityName: 'Winnipeg' },
    { position: 9, countryId: 9, countryName: 'US', stateId: 9, stateName: 'Florida', cityName: 'Miami' },
    { position: 10, countryId: 10, countryName: 'Switzerland', stateId: 10, stateName: 'Basel', cityName: 'Lugano' }
  ];

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource(this.cityDataService.getCities());
    this.bindGrid();
  }

  bindGrid(): void {
    const localStorageData = localStorage.getItem('cities');
    if (localStorageData == null) {
      this.dataSource = new MatTableDataSource(this.cityDataService.getCities(this.city));
    } else {
      this.city = JSON.parse(localStorageData);
      this.dataSource = new MatTableDataSource(this.cityDataService.getCities(this.city));
    }
  }

  addRowData(newData: City) {
    this.city.push(newData);
    this.dataSource.data = this.city;
    this.cityDataService.saveCities(this.city);
  }

  create(): void {
    let model = {
      position: 0,
      countryId: 0,
      countryName: null,
      stateId: 0,
      stateName: null,
      cityName: null
    }
    const dialogRef = this.dialog.open(CityPopupComponent, {
      width: '400px',
      height: '350px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.position = this.city.length + 1;
        this.addRowData(result);
        this.cityDataService.saveCities(this.city);
        this.bindGrid();
      }
    });
  }

  updateRowData(updatedData: City) {
    const index = this.city.findIndex((element: { position: number; }) => element.position === updatedData.position);

    if (index !== -1) {
      this.city[index] = updatedData;
      this.cityDataService.saveCities(this.city);
      this.bindGrid();
    }

  }

  edit(row: any) {
    const dialogRef = this.dialog.open(CityPopupComponent, {
      width: '300px',
      height: '55vh',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.updateRowData(result);
      }
    });
  }

  toDelete(row: any) {

    const index = this.city.indexOf(row);

    if (index !== -1) {

      this.city.splice(index, 1);
      this.dataSource.data = [...this.city];
      this.table.renderRows();
      this.cityDataService.saveCities(this.city);
      this.bindGrid();
    }

  }
}
