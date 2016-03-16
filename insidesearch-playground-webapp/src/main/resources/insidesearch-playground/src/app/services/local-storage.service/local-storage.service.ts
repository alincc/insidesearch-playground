import {Injectable, EventEmitter} from 'angular2/core';

import {SearchModel} from '../nb.service/nb.service'

export class Settings {
    endpoints = [
        '',
        'http://escastest1.nb.no:8090/searchv2/search',
        'http://tctest.nb.no/catalog/v1',
        ];

  constructor(
    public endpoint: string
  ) {  }
}

export class Favorite {
    id: string;
    name: string;
    searchModel: SearchModel;
    
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.searchModel = obj && obj.searchModel || new SearchModel();
    }
    
}

class UUID {
    randomUUID(): string {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };    

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

    getFavorite(id: string):Favorite {
        var favorite: Favorite = null;
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        if (favorites != null) {
            favorites.some(f => {
                if (f.id == id) {
                    favorite = f;
                    return true;
                }
            });
        }
        
        return favorite;
    }

    addToFavorites(favorite: Favorite): void {
        
        if (favorite.id == null) {
            favorite.id = new UUID().randomUUID();
        }
        
        favorite.searchModel.shouldBoostFields = favorite.searchModel.shouldBoostFields.filter(function(f) {
            return f.term != undefined && f.value != undefined;
        });
        
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        if (favorites == null) {
            favorites = [];
        }
        var existsInFavorites: boolean = false;
        favorites.forEach(f => {
            if (f.id == favorite.id) {
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
    
    removeFromFavorites(id: string): void {
        var favorites = [];
        favorites = JSON.parse(localStorage.getItem(LocalStorageService.MY_FAVORTITES));
        favorites.forEach((f, index, array) => {
            if (f.id == id) {
                console.log('sletter ' + id);
                array.splice(index, 1);
            }   
        });
        
        localStorage.setItem(LocalStorageService.MY_FAVORTITES, JSON.stringify(favorites));
        
        this.favoritesEvent.next(true);
    }
}
