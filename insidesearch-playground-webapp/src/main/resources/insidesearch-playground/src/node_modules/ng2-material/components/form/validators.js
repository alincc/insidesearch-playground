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
var lang_1 = require("angular2/src/facade/lang");
var common_1 = require("angular2/common");
var core_1 = require("angular2/core");
var util_1 = require('../../core/util/util');
var lang_2 = require('angular2/src/facade/lang');
var PATTERN_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function () { return MdPatternValidator; }),
    multi: true
}));
var MdPatternValidator = (function () {
    function MdPatternValidator(pattern) {
        if (lang_2.isPresent(pattern)) {
            this.mdPattern = pattern;
        }
    }
    MdPatternValidator.inline = function (pattern) {
        return function validate(control) {
            if (control.value === '' || new RegExp(pattern).test(control.value)) {
                return null;
            }
            return {
                mdPattern: true
            };
        };
    };
    MdPatternValidator.prototype.validate = function (control) {
        return MdPatternValidator.inline(this.mdPattern)(control);
    };
    __decorate([
        core_1.Input('mdPattern'), 
        __metadata('design:type', String)
    ], MdPatternValidator.prototype, "mdPattern", void 0);
    MdPatternValidator = __decorate([
        core_1.Directive({
            selector: '[mdPattern]',
            providers: [PATTERN_VALIDATOR]
        }),
        __param(0, core_1.Attribute('mdPattern')), 
        __metadata('design:paramtypes', [Object])
    ], MdPatternValidator);
    return MdPatternValidator;
})();
exports.MdPatternValidator = MdPatternValidator;
var MAXLENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function () { return MdMaxLengthValidator; }),
    multi: true
}));
var MdMaxLengthValidator = (function () {
    function MdMaxLengthValidator(attr) {
        if (lang_2.isPresent(attr)) {
            this.mdMaxLength = attr;
        }
    }
    MdMaxLengthValidator.inline = function (length) {
        return function validate(control) {
            if (!control.value || control.value.length <= length) {
                return null;
            }
            return {
                mdMaxLength: true
            };
        };
    };
    MdMaxLengthValidator.prototype.validate = function (control) {
        return MdMaxLengthValidator.inline(this.mdMaxLength)(control);
    };
    __decorate([
        core_1.Input('mdMaxLength'), 
        __metadata('design:type', String)
    ], MdMaxLengthValidator.prototype, "mdMaxLength", void 0);
    MdMaxLengthValidator = __decorate([
        core_1.Directive({ selector: '[mdMaxLength]', providers: [MAXLENGTH_VALIDATOR] }),
        __param(0, core_1.Attribute('mdMaxLength')), 
        __metadata('design:paramtypes', [Object])
    ], MdMaxLengthValidator);
    return MdMaxLengthValidator;
})();
exports.MdMaxLengthValidator = MdMaxLengthValidator;
var MAXVALUE_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function () { return MdMaxValueValidator; }),
    multi: true
}));
var MdMaxValueValidator = (function () {
    function MdMaxValueValidator(attr) {
        if (lang_2.isPresent(attr)) {
            this.mdMax = attr;
        }
    }
    MdMaxValueValidator.inline = function (length) {
        return function validate(control) {
            if (lang_2.NumberWrapper.isNaN(control.value) || control.value <= length) {
                return null;
            }
            return {
                mdMax: true
            };
        };
    };
    MdMaxValueValidator.prototype.validate = function (control) {
        return MdMaxValueValidator.inline(this.mdMax)(control);
    };
    __decorate([
        core_1.Input('mdMax'), 
        __metadata('design:type', String)
    ], MdMaxValueValidator.prototype, "mdMax", void 0);
    MdMaxValueValidator = __decorate([
        core_1.Directive({ selector: '[mdMax]', providers: [MAXVALUE_VALIDATOR] }),
        __param(0, core_1.Attribute('mdMax')), 
        __metadata('design:paramtypes', [Object])
    ], MdMaxValueValidator);
    return MdMaxValueValidator;
})();
exports.MdMaxValueValidator = MdMaxValueValidator;
var MINVALUE_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function () { return MdMinValueValidator; }),
    multi: true
}));
var MdMinValueValidator = (function () {
    function MdMinValueValidator(attr) {
        if (lang_2.isPresent(attr)) {
            this.mdMin = attr;
        }
    }
    MdMinValueValidator.inline = function (length) {
        return function validate(control) {
            if (lang_2.NumberWrapper.isNaN(control.value) || control.value >= length) {
                return null;
            }
            return {
                mdMin: true
            };
        };
    };
    MdMinValueValidator.prototype.validate = function (control) {
        return MdMaxValueValidator.inline(this.mdMin)(control);
    };
    __decorate([
        core_1.Input('mdMin'), 
        __metadata('design:type', String)
    ], MdMinValueValidator.prototype, "mdMin", void 0);
    MdMinValueValidator = __decorate([
        core_1.Directive({ selector: '[mdMin]', providers: [MINVALUE_VALIDATOR] }),
        __param(0, core_1.Attribute('mdMin')), 
        __metadata('design:paramtypes', [Object])
    ], MdMinValueValidator);
    return MdMinValueValidator;
})();
exports.MdMinValueValidator = MdMinValueValidator;
var NUMBER_REQUIRED_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(common_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function () { return MdNumberRequiredValidator; }),
    multi: true
}));
var MdNumberRequiredValidator = (function () {
    function MdNumberRequiredValidator() {
    }
    MdNumberRequiredValidator.inline = function () {
        return function validate(control) {
            var isNum = !lang_2.NumberWrapper.isNaN(control.value) && util_1.isNumber(control.value);
            return isNum ? null : { mdNumberRequired: true };
        };
    };
    MdNumberRequiredValidator.prototype.validate = function (control) {
        return MdNumberRequiredValidator.inline()(control);
    };
    MdNumberRequiredValidator = __decorate([
        core_1.Directive({ selector: '[mdNumberRequired]', providers: [NUMBER_REQUIRED_VALIDATOR] }), 
        __metadata('design:paramtypes', [])
    ], MdNumberRequiredValidator);
    return MdNumberRequiredValidator;
})();
exports.MdNumberRequiredValidator = MdNumberRequiredValidator;
exports.INPUT_VALIDATORS = [
    MdMaxLengthValidator,
    MdPatternValidator,
    MdMaxValueValidator,
    MdMinValueValidator,
    MdNumberRequiredValidator
];
//# sourceMappingURL=validators.js.map