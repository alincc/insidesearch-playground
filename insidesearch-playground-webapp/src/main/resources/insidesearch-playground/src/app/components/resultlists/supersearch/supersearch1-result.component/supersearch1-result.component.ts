import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {ToggleComponent} from '../../../toggle.component/toggle.component';

import {Item, SearchResult} from '../../../../services/nb.service/nb.service';
import {ItemComponent} from '../item.component/item.component';

@Component({
    inputs: ['last', 'result', 'contentSearch'],
    selector: 'supersearch1-result',
    templateUrl: 'app/components/resultlists/supersearch/supersearch1-result.component/supersearch1-result.component.html',
    styleUrls: ['app/components/resultlists/supersearch/supersearch1-result.component/supersearch1-result.component.css'],
    providers: [],
    directives: [ItemComponent, ToggleComponent, MATERIAL_DIRECTIVES],
    pipes: []
})
export class Supersearch1ResultComponent {
    result: SearchResult;
    last: boolean;
    contentSearch: any[];


    constructor() { }

}
