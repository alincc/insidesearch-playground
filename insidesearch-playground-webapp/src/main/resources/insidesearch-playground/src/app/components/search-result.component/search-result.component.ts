import {Component} from 'angular2/core';

import {Item} from '../../services/nb.service/nb.service';
import {ToggleComponent} from '../toggle.component/toggle.component';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({
  inputs: ['result', 'last'],
  selector: 'search-result',
  templateUrl: 'app/components/search-result.component/search-result.component.html',
  styleUrls: ['app/components/search-result.component/search-result.component.css'],
  providers: [],
  directives: [ToggleComponent, MATERIAL_DIRECTIVES],
  pipes: []
})
export class SearchResultComponent {
    result: Item;
    last: boolean;
  
    constructor() {}

}
