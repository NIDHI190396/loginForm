import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatePopupComponent } from './state-popup/state-popup.component';
import { StateDataService } from './state-data.service';

export interface State {
  position: number;
  countryId: number;
  countryName: string;
  stateId: number;
  stateName: string;
}

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent {

  dataSource!: MatTableDataSource<State>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  constructor(public dialog: MatDialog, private stateDataService: StateDataService) { }

  displayedColumns: string[] = ['position', 'countryId', 'countryName', 'stateId', 'stateName', 'action'];
  state: State[] = [
    { position: 1, countryId: 1, countryName: 'India', stateId: 1, stateName: 'Gujarat' },
    { position: 2, countryId: 2, countryName: 'Russia', stateId: 2, stateName: 'Amur' },
    { position: 3, countryId: 3, countryName: 'Canada', stateId: 3, stateName: 'Alberta' },
    { position: 4, countryId: 4, countryName: 'US', stateId: 4, stateName: 'California' },
    { position: 5, countryId: 5, countryName: 'Switzerland', stateId: 5, stateName: 'Bern' },
    { position: 6, countryId: 6, countryName: 'India', stateId: 6, stateName: 'Maharashtra' },
    { position: 7, countryId: 7, countryName: 'Russia', stateId: 7, stateName: 'Altai' },
    { position: 8, countryId: 8, countryName: 'Canada', stateId: 8, stateName: 'Manitoba' },
    { position: 9, countryId: 9, countryName: 'US', stateId: 9, stateName: 'Florida' },
    { position: 10, countryId: 10, countryName: 'Switzerland', stateId: 10, stateName: 'Basel' }
  ];

  ngOnInit(): void {
    this.bindGrid();
    // this.dataSource = new MatTableDataSource(this.stateDataService.getStates());
  }

  bindGrid(): void {
    const localStorageData = localStorage.getItem('states');
    if (localStorageData == null) {
      this.dataSource = new MatTableDataSource(this.stateDataService.getStates());
    } else {
      this.state = JSON.parse(localStorageData);
      this.dataSource = new MatTableDataSource(localStorageData ? JSON.parse(localStorageData) : []);
    }
  }

  addRowData(newData: State) {
    this.state.push(newData);
    this.dataSource.data = this.state;
    this.stateDataService.saveStates(this.state);
  }

  create(): void {
    let model = {
      position: 0,
      countryName: null,
      stateName: null,
      contryId: 0
    }
    const dialogRef = this.dialog.open(StatePopupComponent, {
      width: '400px',
      height: '250px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.position = this.state.length + 1;


        this.addRowData(result);
        this.stateDataService.saveStates(this.state);
        this.bindGrid();

      }
    });
  }

  updateRowData(updatedData: State) {
    const index = this.state.findIndex((element: { position: number; }) => element.position === updatedData.position);

    if (index !== -1) {
      this.state[index] = updatedData;

      this.stateDataService.saveStates(this.state);
      this.bindGrid();
    }
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(StatePopupComponent, {
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
    const index = this.state.findIndex((element: { position: number; }) => element.position === row.position);

    if (index !== -1) {
      this.state.splice(index, 1);
      this.stateDataService.saveStates(this.state);

      this.bindGrid();


    }

  }
}
