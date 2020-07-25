"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var nano_css_1 = require("nano-css");
var atoms_1 = require("nano-css/addon/atoms");
var jsx_1 = require("nano-css/addon/jsx");
var keyframes_1 = require("nano-css/addon/keyframes");
var nesting_1 = require("nano-css/addon/nesting");
var rule_1 = require("nano-css/addon/rule");
var style_1 = require("nano-css/addon/style");
var styled_1 = require("nano-css/addon/styled");
var nano = nano_css_1.create({ h: React.createElement });
rule_1.addon(nano);
atoms_1.addon(nano);
keyframes_1.addon(nano);
jsx_1.addon(nano);
style_1.addon(nano);
styled_1.addon(nano);
nesting_1.addon(nano);
var _a = nano, keyframes = _a.keyframes, styled = _a.styled;
exports.keyframes = keyframes;
exports.styled = styled;
exports.px = function (val) { return (typeof val === 'number' ? val + "px" : val); };
function getMergedStyles(styles) {
    return __assign({ altColor: '#ccc', bgColor: '#fff', color: '#333', errorColor: '#a60000', height: 48, loaderColor: '#ccc', loaderSize: 32, savedColor: '#1cb954', sliderColor: '#666', sliderHandleBorderRadius: '50%', sliderHandleColor: '#000', sliderHeight: 4, sliderTrackBorderRadius: 0, sliderTrackColor: '#ccc', trackArtistColor: '#999', trackNameColor: '#333' }, styles);
}
exports.getMergedStyles = getMergedStyles;
