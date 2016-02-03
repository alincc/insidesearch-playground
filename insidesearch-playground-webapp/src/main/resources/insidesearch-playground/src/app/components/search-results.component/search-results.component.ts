import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';

import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SessionStorageService} from '../../services/session-storage.service/session-storage.service';
import {NbService, SearchModel, SearchResult, Item} from '../../services/nb.service/nb.service';
import {SearchmeService} from '../../services/searchme.service/searchme.service';
import {LocalStorageService} from '../../services/local-storage.service/local-storage.service'
import {ForDirective} from '../../directives/for.directive/for.directive';

@Component({
    inputs: ['results', 'loading', 'searchModel', 'compare'],
    selector: 'search-results',
    templateUrl: 'app/components/search-results.component/search-results.component.html',
    styleUrls: ['app/components/search-results.component/search-results.component.css'],
    providers: [],
    directives: [SearchResultComponent, MATERIAL_DIRECTIVES, CORE_DIRECTIVES, ForDirective],
    pipes: []
})
export class SearchResultsComponent {
    results: SearchResult;
    loading: boolean;
    searchModel: SearchModel;

    sizes: string[] = [
        '10',
        '50',
        '100',
    ];

    constructor(
        private sessionStorageService: SessionStorageService,
        public nb: NbService,
        public searchme: SearchmeService,
        public localStorageService: LocalStorageService) {
    }

    toCompare(): void {
        this.sessionStorageService.setToCompare(this.results);
    }
    updateResults(): void {
        var searchService = this.nb;
        if (this.localStorageService.loadSettings().endpoint.endsWith('search')) {
            searchService = this.searchme;
        }

        searchService.searchByUrl(this.results.next)
            .subscribe(
            (results: SearchResult) => { // on success
                var rank = 0;
                this.results.items.forEach(item => {
                    rank = item.rank + 1;
                })
                results.items.forEach(item => {
                    item.rank = rank;
                    this.results.items.push(item);
                    rank++;
                })
                this.results.next = results.next;
            });
    }
    
    changeSize(size:number): void {
        this.searchModel.size = size;
    }
}