import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';

import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SearchModel, SearchResult, Item} from '../../services/nb.service/nb.service';
import {SessionStorageService} from '../../services/session-storage.service/session-storage.service';

@Component({
  inputs: ['results', 'searchModel', 'compare'],
  selector: 'search-results',
  templateUrl: 'app/components/search-results.component/search-results.component.html',
  styleUrls: ['app/components/search-results.component/search-results.component.css'],
  providers: [],
  directives: [SearchResultComponent, MATERIAL_DIRECTIVES, CORE_DIRECTIVES],
  pipes: []
})
export class SearchResultsComponent {
    results: SearchResult;
    searchModel: SearchModel;
    compare: Item[];
    
    sizes: string[] = [
        '10',
        '50',
        '100',
    ];
    
    constructor(private sessionStorageService: SessionStorageService) {}

    toCompare(): void {
        this.sessionStorageService.setToCompare(this.results);
    }

}
