import {Injectable} from 'angular2/core';

import {SearchResult, Item} from '../../services/nb.service/nb.service';

@Injectable()
export class SessionStorageService {

  constructor() {}

    setToCompare(searchResult: SearchResult): void {
        sessionStorage.setItem('searchResult', JSON.stringify(searchResult));
    }

    getToCompare(): SearchResult {
        var s = sessionStorage.getItem('searchResult');
        if (s != null && s.length > 0) {
            return JSON.parse(sessionStorage.getItem('searchResult'));    
        } else {
            return null;
        }
    }
}
