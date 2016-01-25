import {Component, OnInit} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES} from 'angular2/common';

import {SearchBoxComponent} from '../search-box.component/search-box.component';
import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SearchModel, SearchResult} from '../../services/nb.service/nb.service';

declare var componentHandler;



@Component({
  selector: 'search.component',
  templateUrl: 'app/components/search.component/search.component.html',
  styleUrls: ['app/components/search.component/search.component.css'],
  providers: [],
  directives: [SearchBoxComponent, SearchResultComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  pipes: []
})
export class SearchComponent implements OnInit {

    searchModel = new SearchModel('', 100, 'Alle', true, true, false);
    results: SearchResult[];
    mediatypes: string[] = [
    'Alle',
    'Aviser',
    'Bøker',
    ];
    sizes: string[] = [
    '10',
    '50',
    '100',
    ];
    

    constructor() {
    }

    updateResults(results: SearchResult[]): void {
        this.results = results;
        //console.log("results:", this.results); // uncomment to take a look
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit(): void {
        componentHandler.upgradeAllRegistered();
    }
}

