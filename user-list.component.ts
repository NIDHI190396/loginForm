import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  data: Array<any>;

  constructor(){
    this.data = [
        { firstName: 'John', lastName: 'Doe', age: '35' },
        { firstName: 'Michael', lastName: 'Smith', age: '39' },
        { firstName: 'Michael', lastName: 'Jordan', age: '45' },
        { firstName: 'Tanya', lastName: 'Blake', age: '47' }
    ];
}
}
