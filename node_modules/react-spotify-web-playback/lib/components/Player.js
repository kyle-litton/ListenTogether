"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Wrapper = styles_1.styled('div')({
    boxSizing: 'border-box',
    fontSize: 'inherit',
    width: '100%',
    '*': {
        boxSizing: 'border-box',
    },
    button: {
        appearance: 'none',
        backgroundColor: 'transparent',
        border: 0,
        borderRadius: 0,
        color: 'inherit',
        cursor: 'pointer',
        display: 'inline-flex',
        lineHeight: 1,
        padding: 0,
        ':focus': {
            outlineColor: '#000',
            outlineOffset: 3,
        },
    },
    p: {
        margin: 0,
    },
}, function (_a) {
    var styles = _a.styles;
    return ({
        backgroundColor: styles.bgColor,
        minHeight: styles_1.px(styles.height),
    });
}, 'PlayerRSWP');
var Player = function (_a) {
    var children = _a.children, styles = _a.styles;
    return React.createElement(Wrapper, { styles: styles }, children);
};
exports.default = Player;
