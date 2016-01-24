var promise_1 = require("angular2/src/facade/promise");
var animate_1 = require("../../core/util/animate");
var lang_1 = require("angular2/src/facade/lang");
var MdDialogRef = (function () {
    function MdDialogRef() {
        this._contentRef = null;
        this.containerRef = null;
        this.isClosed = false;
        this.contentRefDeferred = promise_1.PromiseWrapper.completer();
        this.whenClosedDeferred = promise_1.PromiseWrapper.completer();
    }
    Object.defineProperty(MdDialogRef.prototype, "backdropRef", {
        set: function (value) {
            var _this = this;
            this._backdropRef = value;
            var subscription = this._backdropRef.instance.onHiding.subscribe(function () {
                _this.close();
                subscription.unsubscribe();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdDialogRef.prototype, "contentRef", {
        set: function (value) {
            this._contentRef = value;
            this.contentRefDeferred.resolve(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdDialogRef.prototype, "instance", {
        get: function () {
            if (lang_1.isPresent(this._contentRef)) {
                return this._contentRef.instance;
            }
            throw "Cannot access dialog component instance *from* that component's constructor.";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdDialogRef.prototype, "whenClosed", {
        get: function () {
            return this.whenClosedDeferred.promise;
        },
        enumerable: true,
        configurable: true
    });
    MdDialogRef.prototype.close = function (result) {
        var _this = this;
        if (result === void 0) { result = null; }
        return animate_1.Animate.leave(this.containerRef.location.nativeElement, 'md-active').then(function () {
            if (_this._backdropRef) {
                _this._backdropRef.instance.hide();
            }
            return _this.contentRefDeferred.promise.then(function (_) {
                if (!_this.isClosed) {
                    _this.isClosed = true;
                    _this.containerRef.dispose();
                    _this.whenClosedDeferred.resolve(result);
                }
            });
        });
    };
    return MdDialogRef;
})();
exports.MdDialogRef = MdDialogRef;
//# sourceMappingURL=dialog_ref.js.map