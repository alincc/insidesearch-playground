import {Component, OnInit} from 'angular2/core';
import {
  Router
} from 'angular2/router';
import {LocalStorageService, Favorite} from '../../services/local-storage.service/local-storage.service';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

declare var componentHandler;

@Component({
  selector: 'my-favorites-component',
  templateUrl: 'app/components/my-favorites.component/my-favorites.component.html',
  styleUrls: ['app/components/my-favorites.component/my-favorites.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})
export class MyFavoritesComponent implements OnInit {
    myFavorites: Favorite[] = [];
    
    constructor(public router: Router,
        public localStorageService: LocalStorageService) {
        localStorageService.favoritesEvent.subscribe((data) => {
            this.loadFavorites();
        });
    }

    loadFavorites(): void {
        this.myFavorites = this.localStorageService.getAllFavorites();
        componentHandler.upgradeAllRegistered();
    }
    
    removeFromFavorites(favorite: Favorite): void {
        console.log(name);
        this.localStorageService.removeFromFavorites(favorite.id);
    }

    onSelectFavorite(favorite: Favorite) {
        this.router.navigate( ['Search', { myFavorite: favorite.id }] );       
    }

    ngOnInit(): void {
       this.loadFavorites();
       componentHandler.upgradeAllRegistered();
    } 

}
