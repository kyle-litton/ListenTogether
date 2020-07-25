"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Wrapper = styles_1.styled('p')({
    textAlign: 'center',
    width: '100%',
}, function (_a) {
    var styles = _a.styles;
    return ({
        borderTop: "1px solid " + styles.errorColor,
        color: styles.errorColor,
        height: styles_1.px(styles.height),
        lineHeight: styles_1.px(styles.height),
    });
}, 'ErrorRSWP');
var ErrorMessage = function (_a) {
    var children = _a.children, styles = _a.styles;
    return React.createElement(Wrapper, { styles: styles }, children);
};
exports.default = ErrorMessage;
