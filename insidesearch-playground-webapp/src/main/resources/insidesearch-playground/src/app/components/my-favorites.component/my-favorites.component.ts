import {Component, OnInit, ElementRef} from 'angular2/core';
import {
  Router
} from 'angular2/router';
import {LocalStorageService, Favorite} from '../../services/local-storage.service/local-storage.service';
import {MATERIAL_DIRECTIVES, MdDialog} from 'ng2-material/all';
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";

import {ForDirective} from '../../directives/for.directive/for.directive';

declare var componentHandler;

@Component({
  selector: 'my-favorites-component',
  templateUrl: 'app/components/my-favorites.component/my-favorites.component.html',
  styleUrls: ['app/components/my-favorites.component/my-favorites.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, ForDirective],
  pipes: []
})
export class MyFavoritesComponent implements OnInit {
    myFavorites: Favorite[] = [];
    
    constructor(
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _dialog: MdDialog, 
        private _element: ElementRef) {
        _localStorageService.favoritesEvent.subscribe((data) => {
            this.loadFavorites();
        });
    }

    loadFavorites(): void {
        this.myFavorites = this._localStorageService.getAllFavorites();
        componentHandler.upgradeAllRegistered();
    }
    
    removeFromFavorites(ev, favorite: Favorite): void {
        console.log(favorite.name);
        let config = new MdDialogConfig()
        .title('Slett favoritt')
        .clickOutsideToClose(false)
        .textContent('Ønsker du å slette "'+favorite.name+'"?')
        .ariaLabel('Slett favoritt')
        .ok('Slett')
        .cancel('Avbryt')
        .targetEvent(ev);
        this._dialog.open(MdDialogBasic, this._element, config)
        .then((ref: MdDialogRef) => {
            ref.whenClosed.then((result) => {
                if (result) {
                    this._localStorageService.removeFromFavorites(favorite.id);
                    this._showToast(favorite.name + ' er fjernet');
                }
            })
        });        
        
        
    }

    onSelectFavorite(favorite: Favorite) {
        this._router.navigate( ['Search', { myFavorite: favorite.id }] );       
    }

    ngOnInit(): void {
       this.loadFavorites();
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
