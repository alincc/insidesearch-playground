import {Component} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES} from 'angular2/common';

import {SearchBoxComponent} from '../search-box.component/search-box.component';
import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SearchModel, SearchResult} from '../../services/nb.service/nb.service';

@Component({
  selector: 'search.component',
  templateUrl: 'app/components/search.component/search.component.html',
  styleUrls: ['app/components/search.component/search.component.css'],
  providers: [],
  directives: [SearchBoxComponent, SearchResultComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  pipes: []
})
export class SearchComponent {
    searchModel = new SearchModel('', 100);
    results: SearchResult[];
    public mediatypes = MEDIATYPES;

    updateResults(results: SearchResult[]): void {
        this.results = results;
        //console.log("results:", this.results); // uncomment to take a look
    }

}

var MEDIATYPES: string[] = [
   'Alle',
   'Aviser',
   'Bøker',
];
