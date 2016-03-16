import {
    Component,
    Injectable,
    bind,
    OnInit,
    ElementRef,
    EventEmitter,
    Inject
} from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import {LocalStorageService} from '../local-storage.service/local-storage.service'

export interface Search {
    search(searchModel:SearchModel): Observable<SearchResult>;
    searchByUrl(queryUrl:string): Observable<SearchResult>
    superSearch(searchModel:SearchModel): Observable<SearchResult[]>;
}

export class ShouldBoost {
    term: string;
    value: string;
}

export class SearchModel {
    query: string;
    size: number;
    mediatype: string;
    digital: boolean;
    freetext: boolean;
    group: boolean;
    explain: boolean;
    next: string;
    public shouldBoostFields: ShouldBoost[] = [];

    public boostFields: any[] = [
        {label: 'title', defaultValue: 10, value: 10},
        {label: 'alternative_title', defaultValue: 4, value: 4},
        {label: 'name', defaultValue: 1, value: 1},
        {label: 'description', defaultValue: 1, value: 1},
        {label: 'hosttitle', defaultValue: 1, value: 1},
        {label: 'otherid', defaultValue: 1, value: 1},
        {label: 'subject', defaultValue: 1, value: 1},
        {label: 'isbn', defaultValue: 1, value: 1},
        {label: 'series', defaultValue: 1, value: 1},
        {label: 'note', defaultValue: 1, value: 1},
        {label: 'ismn', defaultValue: 1, value: 1},
        {label: 'keydate', defaultValue: 1, value: 1},
        {label: 'freetext', defaultValue: 1, value: 1},
    ]

    constructor(obj?: any) {
        this.query = obj && obj.query || '';
        this.size = obj && obj.size || 100;
        this.mediatype = obj && obj.mediatype || 'Alle';
        this.digital = obj && obj.digital || true;
        this.freetext = obj && obj.freetext || true;
        this.group = obj && obj.group || false;
        this.explain = obj && obj.explain || true;
        this.next = obj && obj.next || null;
        this.shouldBoostFields = obj && obj.shouldBoostFields || [];
     }
}

export class SearchResult {
    id:string;
    items:Item[];
    totalElements:number;
    next:string;
    contentSearch: any[];

    constructor(obj?:any) {
        this.id = obj && obj.id || null;
        this.items = obj && obj.items || null;
        this.totalElements = obj && obj.totalElements || null;
        this.next = obj && obj.next || null;
        this.contentSearch = obj && obj.contentSearch || null;
    }
}

export class Item {
    id: string;
    title: string;
    creator: string;
    thumbnail: string;
    mediatype: string;
    explain: string;
    rank: number;
    trending: number;
    trendingNew: boolean;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.creator = obj && obj.creator || null;
        this.thumbnail = obj && obj.thumbnail || null;
        this.mediatype = obj && obj.mediatype || null;
        this.explain = obj && obj.explain || null;
        this.rank = obj && obj.rank || null;
        this.trending = obj && obj.trending || null;
        this.trendingNew = obj && obj.trendingNew || true;
    }
}


@Injectable()
export class NbService implements Search {

    constructor(public http:Http,
                public localStorageService:LocalStorageService) {
    }

    search(searchModel:SearchModel):Observable<SearchResult> {
        let params:string = [
            `q=${searchModel.query == null ? 'qwertyuiopå' : searchModel.query}`,
            `size=${searchModel.size}`
        ].join('&');
        let boostParams = searchModel.boostFields.map(f => {
            return f.label + ',' + f.value;
        }).join('&boost=');
        let shouldBoostParams = searchModel.shouldBoostFields.map(f => {
            return f.term + ','+f.value;
        }).join('&should=');

        let queryUrl: string = `${this.localStorageService.loadSettings().endpoint}/items?${params}&explain=${searchModel.explain}&boost=${boostParams}&should=${shouldBoostParams}`;
        return this.http.get(queryUrl)
            .map((response:Response) => {
                return this.mapResponse(response);
            })
    }

    searchByUrl(queryUrl:string):Observable<SearchResult> {
        return this.http.get(queryUrl)
            .map((response:Response) => {
                return this.mapResponse(response);
            })
    }

    superSearch(searchModel:SearchModel):Observable<SearchResult[]> {
        let params:string = [
            `q=${searchModel.query == null ? 'qwertyuiopå' : searchModel.query}`,
            `size=${searchModel.size}`
        ].join('&');
        let expand = "metadata";
        let boostParams = searchModel.boostFields.map(f => {
            return f.label + ',' + f.value;
        }).join('&boost=');

        let queryUrl:string = `${this.localStorageService.loadSettings().endpoint}/search?${params}&expand=${expand}&explain=${searchModel.explain}&boost=${boostParams}`;
        return this.http.get(queryUrl)
            .map((response:Response) => {
                return this.mapSuperSearchResponse(response);
            })
    }

    private mapResponse(response:Response):SearchResult {
        var items = [];
        var json = response.json();
        var totalElements = json.page.totalElements;
        var entries = this.getEntries(json);
        var next = this.findNext(json);
        for (let i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var item:Item = this.mapEntryToItem(entry, i);
            items.push(item)
        }
        return new SearchResult({
            id: '',
            items: items,
            totalElements: totalElements,
            next: next
        })
    }
    
    private mapSuperSearchResponse(response:Response):SearchResult[] {
        var searchResults = [];
        var books = null, images = null, movies = null, music = null, musicManuscripts = null, newspapers = null, radio = null;
        var json = response.json();
        var mediatypes = Object.keys(json._embedded);
        for (var i = 0; i < mediatypes.length; i++) {
            switch (mediatypes[i]) {
                case "books":
                    var books = json._embedded.books;
                    searchResults.push(this.EntryToSearchResult(books._embedded.items, mediatypes[i], books.page.totalElements, books._embedded.contentSearch));
                    break;
                case "images":
                    var images = json._embedded.images;
                    searchResults.push(this.EntryToSearchResult(images._embedded.items, mediatypes[i], images.page.totalElements, images._embedded.contentSearch));
                    break;
                case "movies":
                    var movies = json._embedded.movies;
                    searchResults.push(this.EntryToSearchResult(movies._embedded.items, mediatypes[i], movies.page.totalElements, movies._embedded.contentSearch));
                    break;
                case "music":
                    var music = json._embedded.music;
                    searchResults.push(this.EntryToSearchResult(music._embedded.items, mediatypes[i], music.page.totalElements, music._embedded.contentSearch));
                    break;
                case "musicManuscripts":
                    var musicManuscripts = json._embedded.musicManuscripts;
                    searchResults.push(this.EntryToSearchResult(musicManuscripts._embedded.items, mediatypes[i], musicManuscripts.page.totalElements, musicManuscripts._embedded.contentSearch));
                    break;
                case "newspapers":
                    var newspapers = json._embedded.newspapers;
                    searchResults.push(this.EntryToSearchResult(newspapers._embedded.items, mediatypes[i], newspapers.page.totalElements, newspapers._embedded.contentSearch));
                    break;
                case "radio":
                    var radio = json._embedded.radio;
                    searchResults.push(this.EntryToSearchResult(radio._embedded.items, mediatypes[i], radio.page.totalElements, radio._embedded.contentSearch));
                    break;
            }
        }

        return searchResults;
    }
    private mapEntryToItem(entry, rowNumber): Item {
        var id = entry.id;
        var metadata = this.getMetadata(entry);
        var title = metadata.title;
        var explain = this.getExplain(entry);
        var mediatype = this.getMediaType(metadata);
        var creator = this.getCreator(metadata);
        var thumbnail = this.getThumbnail(entry);

        return new Item({
                id: id,
                title: title,
                mediatype: mediatype,
                creator: creator,
                thumbnail: thumbnail,
                explain: explain,
                rank: rowNumber + 1
            })
    } 
    

    private EntryToSearchResult(entries, objectId, totalElements, contentSearch) {
        var items = [];
        for (let i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var item:Item = this.mapEntryToItem(entry, i);
            if (item.thumbnail == null) {
                item.thumbnail = "http://www.nb.no/services/image/resolver/URN:NBN:no-nb_digimanus_230572_0001/full/128,0/0/native.jpg";
            }
            items.push(item)
        }
        return new SearchResult({
            id: objectId,
            items: items,
            totalElements: totalElements,
            next: null,
            contentSearch: contentSearch
        });
    }

    private getEntries(json) {
        if (json._embedded.items) {
            return json._embedded.items;
        }
        return [];
    }

    private getMetadata(entry) {
        if (entry.metadata) {
            return entry.metadata;
        }
        return null;
    }

    private getMediaType(metadata) {
        if (metadata.mediaTypes) {
            return metadata.mediaTypes[0];
        }
        return null;
    }
    
    private getCreator(metadata: any): String {
        if (metadata.creators) {
            return metadata.creators[0];
        }
        return null;
    }
    
    private getThumbnail(entry): string {
        if (entry._links.thumbnail_small) {
            return entry._links.thumbnail_small.href;
        }
        return null;
    }

    private findNext(json: any): String {
        if (json._links.next) {
            return json._links.next.href;
        }
        return null;
    }
    
    private getExplain(entry: any): String {
        if (entry.explain) {
            return entry.explain;
        }
        return null;
    }

}