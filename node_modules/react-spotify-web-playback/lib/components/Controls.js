"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Next_1 = require("./icons/Next");
var Pause_1 = require("./icons/Pause");
var Play_1 = require("./icons/Play");
var Previous_1 = require("./icons/Previous");
var Wrapper = styles_1.styled('div')({}, function (_a) {
    var styles = _a.styles;
    return ({
        alignItems: 'center',
        display: 'flex',
        height: styles_1.px(styles.height),
        justifyContent: 'center',
        '@media (max-width: 767px)': {
            padding: styles_1.px(10),
        },
        '> div': {
            minWidth: styles_1.px(styles.height),
            textAlign: 'center',
        },
        button: {
            color: styles.color,
            fontSize: styles_1.px(16),
            '&.rswp__toggle': {
                fontSize: styles_1.px(28),
            },
        },
    });
}, 'ControlsRSWP');
var Controls = (function (_super) {
    __extends(Controls, _super);
    function Controls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Controls.prototype.render = function () {
        var _a = this.props, isExternalDevice = _a.isExternalDevice, isPlaying = _a.isPlaying, onClickNext = _a.onClickNext, onClickPrevious = _a.onClickPrevious, onClickTogglePlay = _a.onClickTogglePlay, nextTracks = _a.nextTracks, previousTracks = _a.previousTracks, styles = _a.styles;
        return (React.createElement(Wrapper, { styles: styles },
            React.createElement("div", null, (!!previousTracks.length || isExternalDevice) && (React.createElement("button", { type: "button", onClick: onClickPrevious, "aria-label": "Previous Track" },
                React.createElement(Previous_1.default, null)))),
            React.createElement("div", null,
                React.createElement("button", { type: "button", className: "rswp__toggle", onClick: onClickTogglePlay, "aria-label": isPlaying ? 'Pause' : 'Play' }, isPlaying ? React.createElement(Pause_1.default, null) : React.createElement(Play_1.default, null))),
            React.createElement("div", null, (!!nextTracks.length || isExternalDevice) && (React.createElement("button", { type: "button", onClick: onClickNext, "aria-label": "Next Track" },
                React.createElement(Next_1.default, null))))));
    };
    return Controls;
}(React.PureComponent));
exports.default = Controls;
