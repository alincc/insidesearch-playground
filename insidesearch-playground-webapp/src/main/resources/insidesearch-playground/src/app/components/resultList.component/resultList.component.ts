import {
    Component,
    OnInit,
} from 'angular2/core';
import {
    Router,
    RouterLink,
    RouteParams,
    Location,
    ROUTER_DIRECTIVES,
} from 'angular2/router';
import {FORM_DIRECTIVES, Validators} from 'angular2/common';

import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

import {LocalStorageService} from '../../services/local-storage.service/local-storage.service'

@Component({
    selector: 'resultList.component',
    templateUrl: 'app/components/resultList.component/resultList.component.html',
    styleUrls: ['app/components/resultList.component/resultList.component.css'],
    providers: [],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, FORM_DIRECTIVES],
    pipes: []
})

export class ResultListComponent {

}