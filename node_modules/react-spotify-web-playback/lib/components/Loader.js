"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Wrapper = styles_1.styled('div')({
    margin: '0 auto',
    position: 'relative',
    '> div': {
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: 0,
        boxSizing: 'border-box',
        height: 0,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 0,
    },
}, function (_a) {
    var styles = _a.styles;
    var pulse = styles_1.keyframes({
        '0%': {
            height: 0,
            width: 0,
        },
        '30%': {
            borderWidth: styles_1.px(8),
            height: styles_1.px(styles.loaderSize),
            opacity: 1,
            width: styles_1.px(styles.loaderSize),
        },
        '100%': {
            borderWidth: 0,
            height: styles_1.px(styles.loaderSize),
            opacity: 0,
            width: styles_1.px(styles.loaderSize),
        },
    });
    return {
        height: styles_1.px(styles.loaderSize),
        width: styles_1.px(styles.loaderSize),
        '> div': {
            animation: pulse + " 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1)",
            borderColor: styles.loaderColor,
        },
    };
}, 'LoaderRSWP');
var Loader = function (_a) {
    var styles = _a.styles;
    return (React.createElement(Wrapper, { styles: styles },
        React.createElement("div", null)));
};
exports.default = Loader;
