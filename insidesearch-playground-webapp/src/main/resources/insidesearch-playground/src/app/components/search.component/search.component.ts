import {Component, OnInit} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES} from 'angular2/common';

import {SearchBoxComponent} from '../search-box.component/search-box.component';
import {SearchResultsComponent} from '../search-results.component/search-results.component';
import {SearchSettingsComponent} from '../search-settings.component/search-settings.component';
import {SessionStorageService} from '../../services/session-storage.service/session-storage.service';
import {SearchModel, SearchResult, Item} from '../../services/nb.service/nb.service';

declare var componentHandler;

@Component({
  selector: 'search.component',
  templateUrl: 'app/components/search.component/search.component.html',
  styleUrls: ['app/components/search.component/search.component.css'],
  providers: [],
  directives: [SearchBoxComponent, SearchResultsComponent, SearchSettingsComponent, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  pipes: []
})
export class SearchComponent implements OnInit {

    searchModel = new SearchModel();
    results: SearchResult;

    constructor(private sessionStorageService: SessionStorageService) {
    }

    updateResults(results: SearchResult): void {
        this.results = results;
        var compare:SearchResult = this.sessionStorageService.getToCompare();
        if (compare != null && compare.items.length > 0) {
            this.results.items.forEach(item => {
                compare.items.forEach(compare => {
                    if (item.id == compare.id) {
                        item.trending = compare.rank - item.rank;
                        item.trendingNew = false;
                    }
                })
            })
        }
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit(): void {
        componentHandler.upgradeAllRegistered();
    }
}

