import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {SuperSearch1Component} from "./supersearch1.component/supersearch1.component";
import {
    ROUTER_DIRECTIVES,
    RouterLink,
} from 'angular2/router';

@Component({
    selector: 'resultlists',
    templateUrl: 'app/components/resultlists/supersearch/resultlists.component.html',
    styleUrls: ['app/components/resultlists/supersearch/resultlists.component.css'],
    providers: [],
    directives: [MATERIAL_DIRECTIVES, RouterLink],
    pipes: []
})

export class ResultlistsComponent {
    constructor() {}
}