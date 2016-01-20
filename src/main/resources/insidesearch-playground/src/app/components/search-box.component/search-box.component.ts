import {
    Component,
    OnInit,
    EventEmitter,
    ElementRef
} from 'angular2/core';
import {
  Router,
  RouterLink,
  RouteParams,
  Location,
  ROUTER_DIRECTIVES,
} from 'angular2/router';

import { Observable } from 'rxjs/Rx';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {NbService, SearchResult} from '../../services/nb.service/nb.service';

@Component({
  outputs : [ 'loading' , 'results' ] ,
  selector: 'search-box',
  templateUrl: 'app/components/search-box.component/search-box.component.html',
  styleUrls: ['app/components/search-box.component/search-box.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})
export class SearchBoxComponent implements OnInit{
  query: string;
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public router: Router,
              public routeParams : RouteParams,
              public nb: NbService) {
  }

  submit(query: string): void {
      //this.router.navigate(['/Search', {query: query}]);
      this.query = query;
      this.search();
  }

  search(): void {
      //this.query = this.routeParams.get('query');
      this.loading.next(true)
      this.nb.search(this.query)
        .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
      );
  }
  
  ngOnInit(): void {
      this.query = this.routeParams.get('query');
      this.search();
  }

}