import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-state-popup',
  templateUrl: './state-popup.component.html',
  styleUrls: ['./state-popup.component.scss']
})
export class StatePopupComponent {

  addStateForm!: FormGroup;
  dataSaved: any;
  data: any;

  constructor(public dialog: MatDialogRef<StatePopupComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.addStateForm = this.fb.group({
      position: new FormControl(this.dialogData?.position),
      countryId: new FormControl (this.dialogData?.countryId, Validators.required),
      stateName: new FormControl (this.dialogData?.stateName, Validators.required)
    });
    this.data = this.dialogData;
  }

  countries:any;
  ngOnInit(){

    const storedCountries = localStorage.getItem('countries');
    this.countries = storedCountries ? JSON.parse(storedCountries) : [];
    
  }


  toSave(): void {
    if (this.addStateForm.valid) {
      const formData = this.addStateForm.value;
      const countryName = this.countries.filter((f:any)=> f.position == formData.countryId)[0].name;

      let postModel = {
        position: formData.position,
        countryId: formData.countryId,
        countryName: countryName,
        stateName: formData.stateName,
      }


      this.dialog.close(postModel);
    }
  }

  toCancel(){
    this.dialog.close();
  }
}
