import {Component, OnInit} from 'angular2/core';

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
    
    constructor(public localStorageService: LocalStorageService) {
        localStorageService.favoritesEvent.subscribe((data) => {
            this.loadFavorites();
        });
    }

    loadFavorites(): void {
        this.myFavorites = this.localStorageService.getAllFavorites();
    }

    ngOnInit(): void {
       this.loadFavorites();
    } 

}
