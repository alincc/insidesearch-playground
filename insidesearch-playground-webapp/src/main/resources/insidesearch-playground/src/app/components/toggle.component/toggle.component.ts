import {Component} from 'angular2/core';

@Component({
  inputs: ['content','header'],
  selector: 'toggle',
  templateUrl: 'app/components/toggle.component/toggle.component.html',
  styleUrls: ['app/components/toggle.component/toggle.component.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class ToggleComponent {
    content: string;
    header: string;
    visible: boolean;
    
    constructor() {
        this.visible = false;
    }

    toggle() {
        this.visible = !this.visible;
    }
}
