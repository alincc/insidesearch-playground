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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var lang_1 = require('angular2/src/facade/lang');
var MdMessage = (function () {
    function MdMessage(pattern) {
        this.okay = true;
        if (lang_1.isPresent(pattern)) {
            this.errorKey = pattern;
        }
    }
    __decorate([
        core_1.Input('md-message'), 
        __metadata('design:type', String)
    ], MdMessage.prototype, "errorKey", void 0);
    MdMessage = __decorate([
        core_1.Directive({
            selector: '[md-message]',
            host: {
                '[style.display]': 'okay ? "none" : "inherit"'
            }
        }),
        __param(0, core_1.Attribute('md-message')), 
        __metadata('design:paramtypes', [Object])
    ], MdMessage);
    return MdMessage;
})();
exports.MdMessage = MdMessage;
var MdMessages = (function () {
    function MdMessages(messages, form, pattern) {
        this.messages = messages;
        this.form = form;
        this.valid = true;
        this._unsubscribe = null;
        if (lang_1.isPresent(pattern)) {
            this.property = pattern;
        }
    }
    Object.defineProperty(MdMessages.prototype, "isTouched", {
        get: function () {
            if (this.property instanceof common_1.NgControlName) {
                return this.property.touched;
            }
            var prop = this.property;
            var group = this.form.control;
            var ctrl = group.controls[prop];
            return ctrl && ctrl.touched;
        },
        enumerable: true,
        configurable: true
    });
    MdMessages.prototype.ngOnInit = function () {
        if (this.property instanceof common_1.NgControlName) {
            var ctrl = this.property;
            this.form = ctrl.formDirective;
            this._unsubscribe = ctrl.update.subscribe(this._valueChanged.bind(this));
        }
        else {
            if (!this.form) {
                throw new Error('md-messages cannot bind to text property without a parent NgFormModel');
            }
            var prop = this.property;
            var group = this.form.control;
            if (!group) {
                throw new Error('md-messages cannot bind to text property without a ControlGroup');
            }
            var ctrl = group.controls[prop];
            if (!ctrl) {
                throw new Error("md-messages cannot find property(" + prop + ") in ControlGroup!");
            }
            this._unsubscribe = ctrl.valueChanges.subscribe(this._valueChanged.bind(this));
        }
    };
    MdMessages.prototype.ngOnDestroy = function () {
        this._unsubscribe.unsubscribe();
    };
    MdMessages.prototype._valueChanged = function (newValue) {
        var errors = null;
        if (this.property instanceof common_1.NgControlName) {
            var ctrl = this.property;
            errors = ctrl.errors;
        }
        else {
            var prop = this.property;
            var group = this.form.control;
            var ctrl = group.controls[prop];
            errors = ctrl.errors;
        }
        this.valid = !errors;
        if (errors) {
            this.messages.toArray().forEach(function (m) {
                m.okay = !m.errorKey ? !errors : !lang_1.isPresent(errors[m.errorKey]);
            });
        }
    };
    __decorate([
        core_1.Input('md-messages'), 
        __metadata('design:type', Object)
    ], MdMessages.prototype, "property", void 0);
    MdMessages = __decorate([
        core_1.Directive({
            selector: '[md-messages]',
            host: {
                'md-messages': '',
                '[style.display]': '(valid || !isTouched) ? "none" : "inherit"',
                '[class.md-valid]': 'valid && isTouched',
                '[class.md-invalid]': '!valid && isTouched'
            }
        }),
        __param(0, core_1.Query(MdMessage)),
        __param(1, core_1.Optional()),
        __param(1, core_1.SkipSelf()),
        __param(1, core_1.Host()),
        __param(2, core_1.Attribute('md-messages')), 
        __metadata('design:paramtypes', [core_1.QueryList, common_1.NgFormModel, Object])
    ], MdMessages);
    return MdMessages;
})();
exports.MdMessages = MdMessages;
//# sourceMappingURL=messages.js.map