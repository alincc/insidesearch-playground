import {Component, OnInit} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {CORE_DIRECTIVES} from 'angular2/common';

import {SearchModel} from '../../services/nb.service/nb.service';

declare var dialogPolyfill;

@Component({
  inputs: ['searchModel'],
  selector: 'search-settings',
  templateUrl: 'app/components/search-settings.component/search-settings.component.html',
  styleUrls: ['app/components/search-settings.component/search-settings.component.css'],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, CORE_DIRECTIVES],
  pipes: []
})
export class SearchSettingsComponent implements OnInit {
    searchModel: SearchModel;
    mediatypes: any[] = [
        {label: 'Alle', value:'Alle'},
        {label: 'Aviser', value:'Aviser'},
        {label: 'Bøker', value:'Bøker'},
        {label: 'Foto', value:'Bilder'},
        {label: 'Film', value:'Film'},
        {label: 'Fjernsyn', value:'Fjernsyn'},
        {label: 'Radio', value:'Radio'},
        {label: 'Musikk', value:'Musikk'},
        {label: 'Programrapporter', value:'Programrapporter'},
        {label: 'Lydopptak', value:'Lydopptak'},
        {label: 'Musikkmanuskripter', value:'Musikkmanuskripter'},
        {label: 'Privatarkiv', value:'Privatarkivmateriale'},
        {label: 'Kart', value:'Kart'},
        {label: 'Noter', value:'Noter'},
        {label: 'Tidsskrift', value:'Tidsskrift'},
        {label: 'Gjenstander', value:'Gjenstander'},
        {label: 'Artikler', value:'Artikler'},
        {label: 'Plakater', value:'Plakater'},
        {label: 'Nettsider', value:'Nettsider'},
        {label: 'Punktskrift', value:'Punktskrift'},
        {label: 'Annet', value:'Annet'},
        {label: 'Ukjent', value:'Ukjent'},
    ];    
    
    constructor() {}

    showAddToFavoritesDialog(): void {
        console.log('tester');    
        var dialog:any = document.querySelector('dialog');
        dialog.showModal();
        
    }

    ngOnInit(): void {
        var dialog:any = document.querySelector('dialog');
        var showDialogButton = document.querySelector('#show-dialog');
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
    }

}
