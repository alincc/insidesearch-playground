import {Component, OnInit} from 'angular2/core';

@Component({
  inputs: ['content','header'],
  selector: 'toggle',
  templateUrl: 'app/components/toggle.component/toggle.component.html',
  styleUrls: ['app/components/toggle.component/toggle.component.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class ToggleComponent implements OnInit {
    content: any;
    isObj: boolean;
    header: string;
    visible: boolean;
    
    constructor() {
        this.visible = false;
    }

    toggle() {
        this.visible = !this.visible;
    }
    
    ngOnInit(): void {
        if (typeof this.content === "string") {
            this.isObj = false;
        } else {
            this.isObj = true;
        }
    }
}
