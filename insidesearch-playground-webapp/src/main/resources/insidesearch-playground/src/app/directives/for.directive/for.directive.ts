import {Directive, ElementRef, Input} from 'angular2/core';

declare var componentHandler;

@Directive({
  selector: '[mdlFor]',
  providers: [],
  host: {},
  
})
export class ForDirective {
    private _defaultColor:string;
    
    @Input() set mdlFor(_defaultColor:string){
        this._defaultColor = _defaultColor;
    }
    
    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.el.nativeElement.setAttribute('for', this._defaultColor);
        componentHandler.upgradeAllRegistered();
    }
}
