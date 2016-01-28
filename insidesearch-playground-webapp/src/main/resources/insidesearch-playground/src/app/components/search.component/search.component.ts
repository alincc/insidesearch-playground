import {Component, OnInit} from 'angular2/core';
import {
  ROUTER_DIRECTIVES,
} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES} from 'angular2/common';

import {SearchBoxComponent} from '../search-box.component/search-box.component';
import {SearchResultComponent} from '../search-result.component/search-result.component';
import {SearchModel, SearchResult, Item} from '../../services/nb.service/nb.service';

declare var componentHandler;
declare var dialogPolyfill;

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
    results: SearchResult;
    toCompareAgainstResult: Item[];
    
    mediatypes: any[] = [
        {label: 'Alle', value:'Alle'},
        {label: 'Aviser', value:'Aviser'},
        {label: 'Bøker', value:'Bøker'},
        {label: 'Foto', value:'Bilder'},
        {label: 'Film', value:'Film'},
        {label: 'Fjernsyn', value:'Fjernsyn'},
        {label: 'Radio', value:'Radio'},
        {label: 'Musikk', value:'Musikk'},
        {label: 'Programrapporter', value:'Programrapporter'},
        {label: 'Lydopptak', value:'Lydopptak'},
        {label: 'Musikkmanuskripter', value:'Musikkmanuskripter'},
        {label: 'Privatarkiv', value:'Privatarkivmateriale'},
        {label: 'Kart', value:'Kart'},
        {label: 'Noter', value:'Noter'},
        {label: 'Tidsskrift', value:'Tidsskrift'},
        {label: 'Gjenstander', value:'Gjenstander'},
        {label: 'Artikler', value:'Artikler'},
        {label: 'Plakater', value:'Plakater'},
        {label: 'Nettsider', value:'Nettsider'},
        {label: 'Punktskrift', value:'Punktskrift'},
        {label: 'Annet', value:'Annet'},
        {label: 'Ukjent', value:'Ukjent'},
    ];
    sizes: string[] = [
    '10',
    '50',
    '100',
    ];
    

    constructor() {
    }

    updateResults(results: SearchResult): void {
        this.results = results;
        if (this.toCompareAgainstResult && this.toCompareAgainstResult.length > 0) {
            this.results.items.forEach(item => {
                this.toCompareAgainstResult.forEach(compare => {
                    if (item.id == compare.id) {
                        item.trending = compare.rank - item.rank;
                        item.trendingNew = false;
                    }
                })
            })
        }
        //console.log("results:", this.results); // uncomment to take a look
        componentHandler.upgradeAllRegistered();
    }
    
    toCompareAgainst(): void {
        this.toCompareAgainstResult = this.results.items.slice(); 
    }

    showAddToFavoritesDialog(): void {
        console.log('tester');    
        var dialog:any = document.querySelector('dialog');
        dialog.showModal();
        
    }
    
    ngOnInit(): void {
        componentHandler.upgradeAllRegistered();

        var dialog:any = document.querySelector('dialog');
        var showDialogButton = document.querySelector('#show-dialog');
        if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
        }
    }
}

