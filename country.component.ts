import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryPopupComponent } from '../country-popup/country-popup.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService } from '../country-data.service';


export interface Country {
  name: string;
  position: number;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit{

  dataSource!: MatTableDataSource<Country>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  constructor(public dialog: MatDialog, private dataService: DataService) { }

  displayedColumns: string[] = ['position', 'name', 'action'];
   country: Country[] = [
    { position: 1, name: 'India' },
    { position: 2, name: 'Russia' },
    { position: 3, name: 'Canada' },
    { position: 4, name: 'Us' },
    { position: 5, name: 'Switzerland' },
  ];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataService.getCountries());
  }

  addRowData(newData: Country) {
    this.country.push(newData);
    this.dataSource.data = this.country;
    this.dataService.saveCountries(this.country);
  }

  create(): void {
    let model = {
      position: 0,
      name: null,
    }
    const dialogRef = this.dialog.open(CountryPopupComponent, {
      width: '400px',
      height: '250px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      result.position = this.country.length + 1;
      this.addRowData(result);
        this.table.renderRows();
      this.dataService.saveCountries(this.country);

      }
    });
  }

  updateRowData(updatedData: Country) {
    const index = this.country.findIndex((element: { position: number; }) => element.position === updatedData.position);

    if (index !== -1) {
      this.country[index] = updatedData;

      this.table.renderRows();
      this.dataService.saveCountries(this.country);
    }

  }

  edit(row: any) {
    const dialogRef = this.dialog.open(CountryPopupComponent, {
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
    
    const index = this.country.findIndex((element: { position: number; }) => element.position === row.position);

    if (index !== -1) {
      this.country.splice(index, 1);
      this.table.renderRows();
      this.dataService.deleteCountry(row.position);
      this.dataService.saveCountries(this.country);
    }

  }
}
