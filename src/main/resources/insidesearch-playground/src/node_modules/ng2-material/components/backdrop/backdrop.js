var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var animate_1 = require("../../core/util/animate");
var core_1 = require("angular2/core");
var core_2 = require("angular2/core");
var core_3 = require("angular2/core");
var core_4 = require("angular2/core");
var core_5 = require("angular2/core");
var core_6 = require("angular2/core");
var core_7 = require("angular2/core");
var MdBackdrop = (function () {
    function MdBackdrop(element) {
        this.element = element;
        this.clickClose = false;
        this.onHiding = new core_7.EventEmitter();
        this.onHidden = new core_7.EventEmitter();
        this.onShowing = new core_7.EventEmitter();
        this.onShown = new core_7.EventEmitter();
        this._visible = false;
        this._transitioning = false;
    }
    Object.defineProperty(MdBackdrop.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        enumerable: true,
        configurable: true
    });
    MdBackdrop.prototype.onClick = function () {
        if (this.clickClose && !this._transitioning && this.visible) {
            this.hide();
        }
    };
    MdBackdrop.prototype.show = function () {
        var _this = this;
        if (this._visible) {
            return Promise.resolve();
        }
        this._visible = true;
        this._transitioning = true;
        this.onShowing.emit(this);
        return animate_1.Animate.enter(this.element.nativeElement, 'md-active').then(function () {
            _this._transitioning = false;
            _this.onShown.emit(_this);
        });
    };
    MdBackdrop.prototype.hide = function () {
        var _this = this;
        if (!this._visible) {
            return Promise.resolve();
        }
        this._visible = false;
        this._transitioning = true;
        this.onHiding.emit(this);
        return animate_1.Animate.leave(this.element.nativeElement, 'md-active').then(function () {
            _this._transitioning = false;
            _this.onHidden.emit(_this);
        });
    };
    __decorate([
        core_5.Input(), 
        __metadata('design:type', Boolean)
    ], MdBackdrop.prototype, "clickClose", void 0);
    __decorate([
        core_6.Output(), 
        __metadata('design:type', core_7.EventEmitter)
    ], MdBackdrop.prototype, "onHiding", void 0);
    __decorate([
        core_6.Output(), 
        __metadata('design:type', core_7.EventEmitter)
    ], MdBackdrop.prototype, "onHidden", void 0);
    __decorate([
        core_6.Output(), 
        __metadata('design:type', core_7.EventEmitter)
    ], MdBackdrop.prototype, "onShowing", void 0);
    __decorate([
        core_6.Output(), 
        __metadata('design:type', core_7.EventEmitter)
    ], MdBackdrop.prototype, "onShown", void 0);
    MdBackdrop = __decorate([
        core_4.Component({
            selector: 'md-backdrop',
            host: {
                '(click)': 'onClick()',
            },
        }),
        core_3.View({ template: '', encapsulation: core_2.ViewEncapsulation.None }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MdBackdrop);
    return MdBackdrop;
})();
exports.MdBackdrop = MdBackdrop;
//# sourceMappingURL=backdrop.js.map