import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
    Router,
    RouteParams,
} from 'angular2/router';

import {SearchModel, ShouldBoost} from '../../services/nb.service/nb.service';
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
    showShould: boolean = false;
    favorite: Favorite = new Favorite();
    
    constructor(
        private _localStorageService:LocalStorageService,
        private _router: Router,
        private _routeParams:RouteParams) {}

    showAddToFavoritesDialog(): void {
        var dialog:any = document.querySelector('dialog');
        dialog.showModal();
        
    }

    closeAddToFavoritesDialog(): void {
        var dialog:any = document.querySelector('dialog');
        dialog.close();
    }
    
    addToFavorites(): void {
        this.favorite.id = null;
        this.saveFavorite();
        this.closeAddToFavoritesDialog();
    }

    saveFavorite(): void {
        var favorite:Favorite = new Favorite({
            id: this.favorite.id,
            name: this.favorite.name, 
            searchModel: this.searchModel
        });
        this._localStorageService.addToFavorites(favorite);
        this._router.navigate( ['Search', { myFavorite: favorite.id }] );
        this._showToast('Favoritt er lagret');
    }

    resetFavorite(): void {
        if (this.favorite.id != null) {
            this.loadFavorite(this.favorite.id);
        } else {
            let f:Favorite = new Favorite();
            this.searchModel.query = f.searchModel.query;
            this.searchModel.boostFields = f.searchModel.boostFields;
            this.searchModel.size = f.searchModel.size;
            this.searchModel.mediatype = f.searchModel.mediatype;
            this.searchModel.digital = f.searchModel.digital;
            this.searchModel.freetext = f.searchModel.freetext;
            this.searchModel.group = f.searchModel.group;
        }
        this._showToast('Tilbakestilt');
    }
    
    loadFavorite(id: string): void {
            this.favorite = this._localStorageService.getFavorite(id);
            this.searchModel.query = this.favorite.searchModel.query;
            this.searchModel.boostFields = this.favorite.searchModel.boostFields;
            this.searchModel.shouldBoostFields = this.favorite.searchModel.shouldBoostFields;
            this.searchModel.size = this.favorite.searchModel.size;
            this.searchModel.mediatype = this.favorite.searchModel.mediatype;
            this.searchModel.digital = this.favorite.searchModel.digital;
            this.searchModel.freetext = this.favorite.searchModel.freetext;
            this.searchModel.group = this.favorite.searchModel.group;

            if (this.searchModel.shouldBoostFields == undefined) {
                this.searchModel.shouldBoostFields = [];
            }
    }

    public addShouldBoostField(index: number): void {
        this.searchModel.shouldBoostFields.splice(index+1, 0, new ShouldBoost());
    }

    public removeShouldBoostField(index: number): void {
        this.searchModel.shouldBoostFields.splice(index, 1);
        this._addEmptyShouldBoosField();
    }

    ngOnInit(): void {
        let myFavorite = this._routeParams.get('myFavorite');
        if (myFavorite != null) {
            this.loadFavorite(myFavorite)
        }
        
        if (this._localStorageService.loadSettings().endpoint.endsWith('v1/search')) {
            this.showShould = true;
        }     


        var dialog:any = document.querySelector('dialog');
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        
        this._addEmptyShouldBoosField();
        
        componentHandler.upgradeAllRegistered();
    }

    private _addEmptyShouldBoosField() {
        if (this.searchModel.shouldBoostFields.length == 0) {
            this.searchModel.shouldBoostFields.push(new ShouldBoost());
        }
    }

    private _showToast(message:string): void {
        var notification:any = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar({
            message: message,
            timeout: 3000
        });        
    }

}
