import {Component} from 'angular2/core';
import {
    RouterOutlet,
  APP_BASE_HREF,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  ROUTER_PRIMARY_COMPONENT,
  HashLocationStrategy,
  LocationStrategy,
  Router,
  RouteConfig,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {SearchComponent} from './components/search.component/search.component';
import {SearchResultComponent} from './components/search-result.component/search-result.component';
import {SettingsComponent} from './components/settings.component/settings.component';

@Component({
  selector: 'insidesearch-playground-app',
  providers: [],
  templateUrl: 'app/insidesearch-playground.html',
  styleUrls: ['app/styles.css'],
  directives: [RouterOutlet, SearchComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  { path: '/', name: 'root', redirectTo: ['Search'] },
  { path: '/search', name: 'Search', component: SearchComponent },
  { path: '/settings', name: 'Settings', component: SettingsComponent },
])
export class InsidesearchPlaygroundApp {

    constructor(public router: Router) {
    }
  
}
