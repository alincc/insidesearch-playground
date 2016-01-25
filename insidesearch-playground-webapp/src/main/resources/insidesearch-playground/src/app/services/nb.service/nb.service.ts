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
    search(searchModel: SearchModel):  Observable<SearchResult[]>;
}

    
export class SearchModel {
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
    
    constructor(
        public query: string,
        public size: number,
        public mediatype: string,
        public digital: boolean,
        public freetext: boolean,
        public group: boolean
    ) {}
}

export class SearchResult {
    id: string;
    title: string;
    creator: string;
    thumbnail: string;
    mediatype: string;
    
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.creator = obj && obj.creator || null;
        this.thumbnail = obj && obj.thumbnail || null;
        this.mediatype = obj && obj.mediatype || null;
    }
}

@Injectable()
export class NbService implements Search{
    
  constructor(public http: Http,
    public localStorageService: LocalStorageService) {
  }
  
  search(searchModel: SearchModel): Observable<SearchResult[]> {
    let params: string = [
      `q=${searchModel.query == null ? 'qwertyuiopå' : searchModel.query}`
    ].join('&');
    let queryUrl: string = `${this.localStorageService.loadSettings().endpoint}?${params}`;
    console.log(queryUrl);
    return this.http.get(queryUrl)
      .map((response: Response) => {
        console.log(response.json());      
        return (<any>response.json())._embedded.items.map(item => {
          console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id,
            title: item.title,
            creator: '',
            thumbnail: "http://www.nb.no/services/image/resolver/URN:NBN:no-nb_digimanus_120847_0001/full/64,0/0/native.jpg",
            mediatype: item.mediatype,
          });
        });
      });
  }
}