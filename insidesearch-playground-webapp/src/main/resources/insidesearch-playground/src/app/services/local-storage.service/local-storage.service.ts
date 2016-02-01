import {Injectable, EventEmitter} from 'angular2/core';

import {SearchModel} from '../nb.service/nb.service'

export class Settings {
    endpoints = [
        '',
        'http://escastest1.nb.no:8090/searchv2/search',
        'http://localhost:8765/v1/catalog/items'
        ];

  constructor(
    public endpoint: string
  ) {  }
}

export class Favorite {
    name: string;
    searchModel: SearchModel;
    
    constructor(obj?: any) {
        this.name = obj && obj.name || null;
        this.searchModel = obj && obj.searchModel || null;
    }
    
}


@Injectable()
export class LocalStorageService {
    static MY_FAVORTITES: string = 'my.favorites';
    static SETTINGS_ENDPOINT: string = 'settings.endpoint';
    
    favoritesEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    constructor() {}

    loadSettings(): Settings {
        let endpoint = localStorage.getItem(LocalStorageService.SETTINGS_ENDPOINT);
        let settings = new Settings(endpoint)
        if (!settings.endpoint) {
            settings.endpoint = settings.endpoints[1];
        }

        return settings;
    }

    saveSettings(settings: Settings): void {
        localStorage.setItem(LocalStorageService.SETTINGS_ENDPOINT, settings.endpoint);
    }

    getAllFavorites():Favorite[] {
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        if (favorites == null) {
            favorites = [];
        }
        return favorites;
    }

    getFavorite(name: string):Favorite {
        var favorite: Favorite = null;
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        if (favorites != null) {
            favorites.some(f => {
                if (f.name == name) {
                    favorite = f;
                    return true;
                }
            });
        }
        
        return favorite;
    }

    addToFavorites(favorite: Favorite): void {
        
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        if (favorites == null) {
            favorites = [];
        }
        var existsInFavorites: boolean = false;
        favorites.forEach(f => {
            if (f.name == favorite.name) {
                f.searchModel = favorite.searchModel;
                existsInFavorites = true;
            }   
        });
        
        if (!existsInFavorites) {
            favorites.push(favorite);
        }
        
        localStorage.setItem(LocalStorageService.MY_FAVORTITES, JSON.stringify(favorites));
        
        this.favoritesEvent.next(true);
    }
    
    removeFromFavorites(name: string): void {
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        favorites.forEach((f, index, array) => {
            if (f.name == name) {
                array.splice(index, 1);
            }   
        });
        this.favoritesEvent.next(true);
    }
}
