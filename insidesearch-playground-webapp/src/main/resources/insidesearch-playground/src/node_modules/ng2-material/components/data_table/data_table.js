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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("angular2/core");
var data_table_tr_1 = require("./data_table_tr");
require("rxjs/add/operator/share");
__export(require('./data_table_tr'));
var MdDataTable = (function () {
    function MdDataTable() {
        this.onSelectableAll = new core_1.EventEmitter(false);
        this.onSelectableChange = new core_1.EventEmitter(false);
        this.selected = [];
        this.onSelectableChange.share();
    }
    MdDataTable.prototype.toggleActivity = function (tr) {
        var event = {
            name: 'selectable_change',
            allSelected: false,
            values: []
        };
        if (tr.isInHeader === true) {
            if (tr.isActive === true) {
                event.allSelected = true;
                event.values = this._getRowsValues();
            }
        }
        else {
            event.values = this.selected.slice(0);
            if (tr.isActive === true) {
                event.values.push(tr.selectableValue);
            }
            else {
                var index = event.values.indexOf(tr.selectableValue);
                if (index !== -1) {
                    event.values.splice(index, 1);
                }
            }
        }
        this.selected = event.values;
        this.onSelectableChange.emit(event);
    };
    MdDataTable.prototype._getRowsValues = function () {
        return this._rows.toArray()
            .filter(function (data, index) { return index > 0; })
            .map(function (tr) { return tr.selectableValue; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MdDataTable.prototype, "selectable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdDataTable.prototype, "onSelectableAll", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MdDataTable.prototype, "onSelectableChange", void 0);
    __decorate([
        core_1.ContentChildren(data_table_tr_1.MdDataTableTr, true), 
        __metadata('design:type', core_1.QueryList)
    ], MdDataTable.prototype, "_rows", void 0);
    MdDataTable = __decorate([
        core_1.Component({
            selector: 'md-data-table',
            template: "<ng-content></ng-content>",
            directives: [data_table_tr_1.MdDataTableTr],
            host: {
                '[class.md-data-table]': 'true',
                '[class.md-data-table-selectable]': 'selectable',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], MdDataTable);
    return MdDataTable;
}());
exports.MdDataTable = MdDataTable;
//# sourceMappingURL=data_table.js.map