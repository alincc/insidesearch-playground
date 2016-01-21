import {Component} from 'angular2/core';
import {
  Router,
  RouterLink,
  RouteParams,
  Location,
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';

import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

export class Settings {
  constructor(
    public endpoint: string
  ) {  }
}

@Component({
  selector: 'settings.component',
  templateUrl: 'app/components/settings.component/settings.component.html',
  styleUrls: ['app/components/settings.component/settings.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, FORM_DIRECTIVES],
  pipes: []
})
export class SettingsComponent {
    settings = new Settings('');
    endpoint: string;
    endpoints = [
        '',
        'http://localhost:8765/v1/catalog/items'
        ];
    
    constructor(public router: Router,
              public routeParams : RouteParams) {
    }

    onSubmit(): void {
        console.log('save ' + this.settings.endpoint + ' to local storage');
    }

}
