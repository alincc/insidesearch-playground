import {Injectable} from 'angular2/core';

import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import {Search, SearchModel, SearchResult, Item} from '../nb.service/nb.service';
import {LocalStorageService} from '../local-storage.service/local-storage.service' 

let NB_NAMESPACE = 'http://www.nb.no/xml/search/1.0/';
let OPENSEARCH_NAMESPACE = 'http://a9.com/-/spec/opensearch/1.1/'

@Injectable()
export class SearchmeService implements Search {

    constructor(
        public http: Http,
        public localStorageService: LocalStorageService) {}

    search(searchModel: SearchModel): Observable<SearchResult> {
        console.log(searchModel.boostFields);
        
        var boost = [];
        searchModel.boostFields.forEach(field => {
            boost.push(field.value);
        });
        let boostParams = boost.join(',');

        let params: string[] = [
            `q=${searchModel.query == null ? '' : searchModel.query}`,
            `ft=${searchModel.freetext}`,
            `group=${searchModel.group}`,
            `boost=${boostParams}`,
            `itemsPerPage=${searchModel.size}`
        ]
        
        if (searchModel.digital) {
            params.push('filter=digital:Ja');
        }
        if (searchModel.mediatype != 'Alle') {
            params.push('filter=mediatype:'+searchModel.mediatype);
        }
        
        let queryUrl: string = `${this.localStorageService.loadSettings().endpoint}?${params.join('&')}`;
        console.log(queryUrl);
        return this.http.get(queryUrl)
        .map((response: Response) => {
            let items = [];
            var xmlDoc = <any>new DOMParser().parseFromString(response.text(), 'text/xml');
            let totalElements = xmlDoc.getElementsByTagNameNS(OPENSEARCH_NAMESPACE, 'totalResults')[0].childNodes[0].nodeValue;
            var entries = xmlDoc.getElementsByTagName('entry');
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                //console.log(entry);
                var mediatypes = entry.getElementsByTagNameNS(NB_NAMESPACE, 'mediatype')[0].childNodes[0].nodeValue.replace(" ", "").split(';');
                var urn = this.findFirstUrn(entry);
                var isJp2 = this.isJp2(entry);
                var thumbnail = this.findThumbnailLink(isJp2, urn, mediatypes);
                var creator = this.findCreator(entry);
                
                items.push(new Item({
                    id: entry.getElementsByTagName('id')[0].childNodes[0].nodeValue,
                    title: entry.getElementsByTagName('title')[0].childNodes[0].nodeValue,
                    creator: creator,
                    thumbnail: thumbnail,
                    mediatype: mediatypes.join(','),
                    rank: i+1,
                }));
                
            }
            return new SearchResult({
                id: '',
                items: items,
                totalElements: totalElements
            });      
        });
    }
    
    private findThumbnailLink(isJp2: boolean, urn: string, mediatypes: string[]): string {
        if (isJp2 && (mediatypes.indexOf('Bøker') != -1 ||
            urn.indexOf('digibok') != -1 ||
            mediatypes.indexOf('Kart') != -1 ||
            mediatypes.indexOf('Noter') != -1)) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'_C1/full/64,0/0/native.jpg';
        } else if (isJp2 && (mediatypes.indexOf('Bilder') != -1)) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'/full/64,0/0/native.jpg';
        } else if (isJp2 && (mediatypes.indexOf('Aviser') != -1)) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'-1_001_null/full/64,0/0/native.jpg';
        } else if (isJp2 && (mediatypes.indexOf('Programrapporter') != -1 ||
            mediatypes.indexOf('Musikkmanuskripter') != -1 ||
            mediatypes.indexOf('Privatarkivmateriale') != -1 ||
            mediatypes.indexOf('Tidsskrift') != -1
        )) {
            return 'http://www.nb.no/services/image/resolver/'+urn+'_0001/full/64,0/0/native.jpg';
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
