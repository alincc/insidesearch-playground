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

let NB_API_URL: string = 'http://ronnym.nb.no:8765/v1/catalog/items';

export class SearchResult {
    id: string;
    title: string;
    thumbnail: string;
    
    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.thumbnail = obj && obj.thumbnail || null;
    }
}

@Injectable()
export class NbService {
  constructor(public http: Http,
              @Inject(NB_API_URL) private apiUrl: string) {
  }
  
  search(query: string): Observable<SearchResult[]> {
    let params: string = [
      `q=${query}`
    ].join('&');
    let queryUrl: string = `${this.apiUrl}?${params}`;
    console.log(queryUrl);
    return this.http.get(queryUrl)
      .map((response: Response) => {
        console.log(response.json());      
        return (<any>response.json())._embedded.items.map(item => {
          console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id,
            title: item.title,
            thumbnail: "http://www.nb.no/services/image/resolver/URN:NBN:no-nb_digimanus_120847_0001/full/64,0/0/native.jpg",
          });
        });
      });
  }
}

export var nbServiceInjectables: Array<any> = [
  bind(NbService).toClass(NbService),
  bind(NB_API_URL).toValue(NB_API_URL)
];