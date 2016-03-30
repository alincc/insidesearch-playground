"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("angular2/core");
var data_table_1 = require("./data_table");
var checkbox_1 = require("../checkbox/checkbox");
require("rxjs/add/operator/map");
var MdDataTableTr = (function () {
    function MdDataTableTr(table, _element) {
        this.table = table;
        this._element = _element;
        this.isInHeader = false;
        this.isActive = false;
        this.thDisplayed = false;
        this.tdDisplayed = false;
    }
    MdDataTableTr.prototype.change = function () {
        this.isActive = !this.isActive;
        this.table.toggleActivity(this);
    };
    MdDataTableTr.prototype._initListeners = function () {
        var _this = this;
        if (this.isInHeader === true) {
            this.table.onSelectableChange
                .map(function (event) { return event.allSelected; })
                .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
        }
        else {
            this.table.onSelectableChange
                .map(function (event) {
                return event.values !== undefined &&
                    event.values.length &&
                    (event.values.findIndex(function (value) { return value === _this.selectableValue; })) !== -1;
            })
                .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
        }
    };
    MdDataTableTr.prototype.ngAfterContentInit = function () {
        if (null !== this.table && undefined !== this.table) {
            var element = this._element.nativeElement;
            this.isInHeader = element.parentElement.localName === 'thead';
            this._initListeners();
            this.thDisplayed = this.table.selectable && this.isInHeader;
            this.tdDisplayed = this.table.selectable && !this.isInHeader;
            if (this.isInHeader === false && this.selectableValue === undefined) {
                this.selectableValue = Array.prototype.indexOf.call(element.parentNode.children, element).toString();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MdDataTableTr.prototype, "selectableValue", void 0);
    MdDataTableTr = __decorate([
        core_1.Component({
            selector: 'tr',
            template: "\n        <template [ngIf]=\"thDisplayed\">\n          <th>\n              <md-checkbox #check (click)=\"change()\" [checked]=\"isActive\"></md-checkbox>\n          </th>\n        </template>\n        <template [ngIf]=\"tdDisplayed\">\n          <td>\n            <md-checkbox #check [checked]=\"isActive\"></md-checkbox>\n          </td>\n        </template>\n        <ng-content></ng-content>\n    ",
            directives: [checkbox_1.MdCheckbox],
            host: {
                '[class.active]': 'isActive',
                '(click)': 'table?.selectable && !thDisplayed && change()'
            }
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
    ], MdDataTableTr);
    return MdDataTableTr;
}());
exports.MdDataTableTr = MdDataTableTr;
//# sourceMappingURL=data_table_tr.js.map