import {Component} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

import {SearchBoxComponent} from '../search-box.component/search-box.component';
import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SearchResult} from '../../services/nb.service/nb.service';

@Component({
  selector: 'search.component',
  templateUrl: 'app/components/search.component/search.component.html',
  styleUrls: ['app/components/search.component/search.component.css'],
  providers: [],
  directives: [SearchBoxComponent, SearchResultComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})
export class SearchComponent {
results: SearchResult[];

  updateResults(results: SearchResult[]): void {
    this.results = results;
    console.log("results:", this.results); // uncomment to take a look
  }
  

}
