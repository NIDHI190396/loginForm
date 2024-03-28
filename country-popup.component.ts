import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.scss']
})
export class CountryPopupComponent {

  addCountryForm!: FormGroup;
  dataSaved: any;
  data: any;

  constructor(public dialog: MatDialogRef<CountryPopupComponent>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.addCountryForm = this.fb.group({
      position: new FormControl(this.dialogData?.position),
      name: new FormControl (this.dialogData?.name, Validators.required),
    });
    this.data = this.dialogData;
  }

  toSave(): void {
    if (this.addCountryForm.valid) {
      const formData = this.addCountryForm.value;

      this.dialog.close(formData);
    }
  }

  toCancel(){
    this.dialog.close();
  }

}
