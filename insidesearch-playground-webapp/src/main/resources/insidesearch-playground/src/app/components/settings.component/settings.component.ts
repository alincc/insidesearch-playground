import {
    Component,
    OnInit,
} from 'angular2/core';
import {
  Router,
  RouterLink,
  RouteParams,
  Location,
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';

import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

import {Settings, LocalStorageService} from '../../services/local-storage.service/local-storage.service'

@Component({
  selector: 'settings.component',
  templateUrl: 'app/components/settings.component/settings.component.html',
  styleUrls: ['app/components/settings.component/settings.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, FORM_DIRECTIVES],
  pipes: []
})
export class SettingsComponent implements OnInit{
    settings: Settings;
    endpoint: string;
    endpoints = [];
    
    constructor(public router: Router,
              public routeParams: RouteParams,
              public localStorageService: LocalStorageService) {
    }

    onSubmit(): void {
        this.localStorageService.saveSettings(this.settings);
    }

    ngOnInit(): void {
        this.settings = this.localStorageService.loadSettings();
    }
}