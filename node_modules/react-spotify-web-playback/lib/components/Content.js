"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Wrapper = styles_1.styled('div')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    '> *': {
        width: '100%',
        '@media (min-width: 600px)': {
            width: '33.3333%',
        },
    },
    '@media (min-width: 600px)': {
        flexDirection: 'row',
    },
}, function (_a) {
    var styles = _a.styles;
    return ({
        minHeight: styles_1.px(styles.height),
    });
}, 'ContentRSWP');
var Content = function (_a) {
    var children = _a.children, styles = _a.styles;
    return React.createElement(Wrapper, { styles: styles }, children);
};
exports.default = Content;
