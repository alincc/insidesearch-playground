import {Component, OnInit} from 'angular2/core';
import {
  Router
} from 'angular2/router';
import {LocalStorageService, Favorite} from '../../services/local-storage.service/local-storage.service';

@Component({
  selector: 'my-favorites-component',
  templateUrl: 'app/components/my-favorites.component/my-favorites.component.html',
  styleUrls: ['app/components/my-favorites.component/my-favorites.component.css'],
  providers: [],
  directives: [],
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
    }
    
    removeFromFavorites(name: string): void {
        console.log(name);
        this.localStorageService.removeFromFavorites(name);
    }

    onSelectFavorite(favorite: Favorite) {
        this.router.navigate( ['Search', { myFavorite: favorite.name }] );       
    }

    ngOnInit(): void {
       this.loadFavorites();
    } 

}
