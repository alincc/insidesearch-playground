import {
    Component,
    OnInit,
    EventEmitter,
    ElementRef,
    Injectable,
} from 'angular2/core';
import {
  Router,
  RouterLink,
  RouteParams,
  Location,
  ROUTER_DIRECTIVES,
} from 'angular2/router';

import { Observable } from 'rxjs/Rx';
import {MATERIAL_DIRECTIVES, MdDialog} from 'ng2-material/all';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {NbService, SearchResult} from '../../services/nb.service/nb.service';

@Component({
  outputs : [ 'loading' , 'results' ] ,
  selector: 'search-box',
  templateUrl: 'app/components/search-box.component/search-box.component.html',
  styleUrls: ['app/components/search-box.component/search-box.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink],
  pipes: []
})
@Injectable()
export class SearchBoxComponent implements OnInit{
  query: string;
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public router: Router,
              public routeParams : RouteParams,
              public nb: NbService,
              public dialog: MdDialog, 
              public element: ElementRef) {
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

  showSettings(ev) {
      console.log('settings');
      this.router.navigate(['/Settings', {}]);
  };
  
  ngOnInit(): void {
      this.query = this.routeParams.get('query');
      this.search();
      console.log(DOM);
  }

}