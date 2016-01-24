import {Injectable} from 'angular2/core';

import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import {Search, SearchModel, SearchResult} from '../nb.service/nb.service';
import {LocalStorageService} from '../local-storage.service/local-storage.service' 

let NB_NAMESPACE = 'http://www.nb.no/xml/search/1.0/';

@Injectable()
export class SearchmeService implements Search {

    constructor(
        public http: Http,
        public localStorageService: LocalStorageService) {}

    search(searchModel: SearchModel): Observable<SearchResult[]> {
        let params: string = [
            `q=${searchModel.query == null ? '' : searchModel.query}`,
            `itemsPerPage=${searchModel.size}`
        ].join('&');
        let queryUrl: string = `${this.localStorageService.loadSettings().endpoint}?${params}`;
        console.log(queryUrl);
        return this.http.get(queryUrl)
        .map((response: Response) => {
            let searchResult = [];
            var xmlDoc = <any>new DOMParser().parseFromString(response.text(), 'text/xml');
            var entries = xmlDoc.getElementsByTagName('entry');
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                console.log(entry);
                var mediatypes = entry.getElementsByTagNameNS(NB_NAMESPACE, 'mediatype')[0].childNodes[0].nodeValue.replace(" ", "").split(';');
                var urn = this.findFirstUrn(entry);
                var isJp2 = this.isJp2(entry);
                var thumbnail = this.findThumbnailLink(isJp2, urn, mediatypes);
                var creator = this.findCreator(entry);
                
                searchResult.push(new SearchResult({
                    id: entry.getElementsByTagName('id')[0].childNodes[0].nodeValue,
                    title: entry.getElementsByTagName('title')[0].childNodes[0].nodeValue,
                    creator: creator,
                    thumbnail: thumbnail,
                    mediatype: mediatypes.join(','),
                }));
                
            }
            return searchResult;      
        });
    }
    
    private findThumbnailLink(isJp2: boolean, urn: string, mediatypes: string[]): string {
        console.log('isJp2=' + isJp2 + ', mediatype=' + mediatypes);
        if (isJp2 && (mediatypes.indexOf('Bøker') != -1 || urn.indexOf('digibok') != -1)) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'_C1/full/64,0/0/native.jpg';
        } else if (isJp2 && (mediatypes.indexOf('Bilder') != -1)) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'/full/64,0/0/native.jpg';
        }
        return null;
    }
    
    private findFirstUrn(entry: any): string {
        var urns = entry.getElementsByTagNameNS(NB_NAMESPACE, 'urn');
        if (urns.length > 0) {
            return urns[0].childNodes[0].nodeValue.split(';')[0];
        }
        return null;
    }
    
    private findCreator(entry: any): string {
        var creator = entry.getElementsByTagNameNS(NB_NAMESPACE, 'namecreator');
        if (creator.length > 0) {
            return creator[0].childNodes[0].nodeValue.split(';')[0];
        }
        return null;
    }

    private isJp2(entry: any): boolean {
        var contentClasses = entry.getElementsByTagNameNS(NB_NAMESPACE, 'contentclasses');
        if (contentClasses.length > 0) {
            return contentClasses[0].childNodes[0].nodeValue.replace(/\s/g, '').split(';').indexOf('jp2') != -1 ? true : false;
        }
        return false;
    }
}
