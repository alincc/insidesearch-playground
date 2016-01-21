var lang_1 = require("angular2/src/facade/lang");
var dom_adapter_1 = require("angular2/src/platform/dom/dom_adapter");
var animate_1 = require("./animate");
var Ink = (function () {
    function Ink() {
    }
    Ink.canApply = function (element) {
        return !dom_adapter_1.DOM.hasAttribute(element, 'md-no-ink');
    };
    Ink.getSize = function (fit, width, height) {
        return fit
            ? Math.max(width, height)
            : Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    };
    Ink.ripple = function (element, x, y) {
        var fit = lang_1.isPresent(dom_adapter_1.DOM.getAttribute(element, 'md-fab'));
        var container = dom_adapter_1.DOM.createElement('div');
        dom_adapter_1.DOM.addClass(container, 'md-ripple-container');
        var ripple = dom_adapter_1.DOM.createElement('div');
        dom_adapter_1.DOM.addClass(ripple, 'md-ripple');
        dom_adapter_1.DOM.appendChild(container, ripple);
        dom_adapter_1.DOM.appendChild(element, container);
        var getHostSize = function () {
            var elX = element.offsetWidth;
            var elY = element.offsetHeight;
            return Ink.getSize(fit, elX, elY);
        };
        var getInitialStyles = function () {
            var size = getHostSize();
            var color = dom_adapter_1.DOM.getComputedStyle(element).color || 'rgb(0,0,0)';
            return {
                'background-color': color,
                left: (x - size / 2) + "px",
                top: (y - size / 2) + "px",
                width: size + "px",
                height: size + "px",
                opacity: 0.2,
                transform: 'scale(0.01)'
            };
        };
        return animate_1.Animate.setStyles(ripple, getInitialStyles())
            .then(function () { return animate_1.Animate.animateStyles(ripple, {
            left: '50%',
            top: '50%',
            opacity: 0.1,
            transform: 'translate(-50%, -50%) scale(1)'
        }, 450); })
            .then(function () { return animate_1.Animate.animateStyles(ripple, { opacity: 0 }, 650); })
            .then(function () { return dom_adapter_1.DOM.removeChild(element, container); });
    };
    Ink.rippleEvent = function (element, event) {
        var rippleX = event.offsetX;
        var rippleY = event.offsetY;
        if (element !== event.srcElement) {
            var rect = dom_adapter_1.DOM.getBoundingClientRect(element);
            rippleX = event.clientX - rect.left;
            rippleY = event.clientY - rect.top;
        }
        return Ink.ripple(element, rippleX, rippleY);
    };
    return Ink;
})();
exports.Ink = Ink;
//# sourceMappingURL=ink.js.map