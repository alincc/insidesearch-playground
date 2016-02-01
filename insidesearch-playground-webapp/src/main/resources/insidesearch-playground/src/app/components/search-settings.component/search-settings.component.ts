import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
  RouteParams,
} from 'angular2/router';

import {SearchModel} from '../../services/nb.service/nb.service';
import {LocalStorageService, Favorite} from '../../services/local-storage.service/local-storage.service';

declare var dialogPolyfill;
declare var componentHandler;

@Component({
  inputs: ['searchModel'],
  selector: 'search-settings',
  templateUrl: 'app/components/search-settings.component/search-settings.component.html',
  styleUrls: ['app/components/search-settings.component/search-settings.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, CORE_DIRECTIVES],
  pipes: []
})
export class SearchSettingsComponent implements OnInit {
    searchModel: SearchModel;
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
    favorite: Favorite = new Favorite();
    
    constructor(
        public localStorageService:LocalStorageService,
        private routeParams:RouteParams) {}

    showAddToFavoritesDialog(): void {
        var dialog:any = document.querySelector('dialog');
        dialog.showModal();
        
    }

    closeAddToFavoritesDialog(): void {
        var dialog:any = document.querySelector('dialog');
        dialog.close();
    }
    
    addToFavorites(): void {
        var favorite:Favorite = new Favorite({
            name: this.favorite.name, 
            searchModel: this.searchModel
        });
        this.localStorageService.addToFavorites(favorite);
    }

    ngOnInit(): void {
        let myFavorite = this.routeParams.get('myFavorite');
        if (myFavorite != null) {
            this.favorite = this.localStorageService.getFavorite(myFavorite);
            this.searchModel = this.favorite.searchModel;
        }

        var dialog:any = document.querySelector('dialog');
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        
        componentHandler.upgradeAllRegistered();
    }

}
