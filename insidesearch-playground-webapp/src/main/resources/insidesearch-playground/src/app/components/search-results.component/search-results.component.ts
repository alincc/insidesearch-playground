import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';

import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SessionStorageService} from '../../services/session-storage.service/session-storage.service';
import {NbService, SearchModel, SearchResult, Item} from '../../services/nb.service/nb.service';
import {SearchmeService} from '../../services/searchme.service/searchme.service';
import {LocalStorageService} from '../../services/local-storage.service/local-storage.service'
import {ForDirective} from '../../directives/for.directive/for.directive';

declare var componentHandler;

@Component({
    inputs: ['results', 'loading', 'searchModel', 'compare'],
    selector: 'search-results',
    templateUrl: 'app/components/search-results.component/search-results.component.html',
    styleUrls: ['app/components/search-results.component/search-results.component.css'],
    providers: [],
    directives: [SearchResultComponent, MATERIAL_DIRECTIVES, CORE_DIRECTIVES, ForDirective],
    pipes: []
})
export class SearchResultsComponent implements OnInit{
    results: SearchResult;
    loading: boolean;
    searchModel: SearchModel;

    sizes: string[] = [
        '10',
        '50',
        '100',
    ];

    constructor(
        private _sessionStorageService: SessionStorageService,
        private _nb: NbService,
        private _searchme: SearchmeService,
        private _localStorageService: LocalStorageService) {
    }

    toCompare(): void {
        this._sessionStorageService.setToCompare(this.results);
        this._showToast('Treffliste lagret');
    }

    updateResults(): void {
        var searchService = this._nb;
        if (this._localStorageService.loadSettings().endpoint.endsWith('search')) {
            searchService = this._searchme;
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

                this.compareNewResult();
            });
    }

    compareNewResult(): void {
        var compare: SearchResult = this._sessionStorageService.getToCompare();
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

    changeSize(size:number): void {
        this.searchModel.size = size;
    }

    ngOnInit(): void {
        componentHandler.upgradeAllRegistered();
    }

    private _showToast(message:string): void {
        var notification:any = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar({
            message: message,
            timeout: 3000
        });
    }
}