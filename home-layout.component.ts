import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
<app-side-menu></app-side-menu>

  <router-outlet></router-outlet>`,
  styles: [
  ]
})
export class HomeLayoutComponent {

}
