import {Component} from 'angular2/core';

import {SearchResult} from '../../services/nb.service/nb.service';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({
  inputs: ['result'],
  selector: 'search-result',
  templateUrl: 'app/components/search-result.component/search-result.component.html',
  styleUrls: ['app/components/search-result.component/search-result.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})
export class SearchResultComponent {
    result: SearchResult;
  
    constructor() {}

}
