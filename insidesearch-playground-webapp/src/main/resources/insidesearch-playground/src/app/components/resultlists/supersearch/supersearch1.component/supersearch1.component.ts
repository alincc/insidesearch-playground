import {
    Component,
    OnInit,
    EventEmitter,
    Injectable
} from 'angular2/core';
import {
    Location,
    ROUTER_DIRECTIVES
} from 'angular2/router';
import { Observable } from 'rxjs/Rx';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {LocalStorageService} from '../../../../services/local-storage.service/local-storage.service'
import {SearchBoxComponent} from "../../../search-box.component/search-box.component";
import {Search, NbService, SearchResult, SearchModel} from '../../../../services/nb.service/nb.service';
import {SearchmeService} from "../../../../services/searchme.service/searchme.service";
import {Supersearch1ResultComponent} from '../supersearch1-result.component/supersearch1-result.component';

declare var componentHandler;

@Component({
    selector: 'supersearch1',
    templateUrl: 'app/components/resultlists/supersearch/supersearch1.component/supersearch1.component.html',
    styleUrls: ['app/components/resultlists/supersearch/supersearch1.component/supersearch1.component.css'],
    providers: [],
    directives: [Supersearch1ResultComponent, SearchBoxComponent, MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
    pipes: []
})

@Injectable()
export class SuperSearch1Component implements OnInit {
    searchModel = new SearchModel();
    loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    results: SearchResult[] = [];

    constructor(public nb:NbService,
                public searchme:SearchmeService,
                public localStorageService:LocalStorageService) {
    }

    search():void {
        var searchService:Search = this.nb;
        if (this.localStorageService.loadSettings().endpoint.endsWith('v1/superSearch')) {
            searchService = this.searchme;
        }

        this.loading.next(true);
        searchService.superSearch(this.searchModel)
            .subscribe(
                (results:SearchResult[]) => { // on sucesss
                    console.log(results);
                    this.loading.next(false);
                    this.results = results;
                    console.log(this.results);
                },
                (err:any) => { // on error
                    console.log(err);
                    this.loading.next(false);
                },
                () => { // on completion
                    this.loading.next(false);
                }
            );

    }

    ngOnInit():void {
        componentHandler.upgradeAllRegistered();
    }
}