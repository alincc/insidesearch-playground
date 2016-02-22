import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {ToggleComponent} from '../../../toggle.component/toggle.component';

import {Item} from '../../../../services/nb.service/nb.service';

@Component({
  inputs: ['last', 'item', 'contentSearch'],
  selector: 'item',
  templateUrl: 'app/components/resultlists/supersearch/item.component/item.component.html',
  styleUrls: ['app/components/resultlists/supersearch/item.component/item.component.css'],
  providers: [],
  directives: [ToggleComponent, MATERIAL_DIRECTIVES],
  pipes: []
})
export class ItemComponent {
    item: Item;
    last: boolean;
    contentSearch: any[];
  
    constructor() {}

}
