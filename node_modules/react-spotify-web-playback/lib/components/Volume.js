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
var react_range_slider_1 = require("@gilbarbara/react-range-slider");
var styles_1 = require("../styles");
var ClickOutside_1 = require("./ClickOutside");
var VolumeHigh_1 = require("./icons/VolumeHigh");
var VolumeLow_1 = require("./icons/VolumeLow");
var VolumeMute_1 = require("./icons/VolumeMute");
var Wrapper = styles_1.styled('div')({
    position: 'relative',
    zIndex: 20,
    '> div': {
        bottom: '120%',
        display: 'flex',
        flexDirection: 'column',
        padding: styles_1.px(12),
        position: 'absolute',
        right: "-" + styles_1.px(3),
    },
    '> button': {
        fontSize: styles_1.px(26),
    },
    '@media (max-width: 879px)': {
        display: 'none',
    },
}, function (_a) {
    var styles = _a.styles;
    return ({
        '> button': {
            color: styles.color,
        },
        '> div': {
            backgroundColor: styles.bgColor,
            boxShadow: styles.altColor ? "1px 1px 10px " + styles.altColor : 'none',
        },
    });
}, 'VolumeRSWP');
var Volume = (function (_super) {
    __extends(Volume, _super);
    function Volume(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function () {
            _this.setState(function (state) { return ({ isOpen: !state.isOpen }); });
        };
        _this.handleChangeSlider = function (_a) {
            var y = _a.y;
            var setVolume = _this.props.setVolume;
            var volume = Math.round(y) / 100;
            clearTimeout(_this.timeout);
            _this.timeout = window.setTimeout(function () {
                setVolume(volume);
            }, 250);
            _this.setState({ volume: volume });
        };
        _this.handleDragEndSlider = function () {
            _this.setState({ isOpen: false });
        };
        _this.state = {
            isOpen: false,
            volume: props.volume,
        };
        return _this;
    }
    Volume.prototype.componentDidUpdate = function (prevProps) {
        var volumeState = this.state.volume;
        var volume = this.props.volume;
        if (prevProps.volume !== volume && volume !== volumeState) {
            this.setState({ volume: volume });
        }
    };
    Volume.prototype.render = function () {
        var _a = this.state, isOpen = _a.isOpen, volume = _a.volume;
        var styles = this.props.styles;
        var icon = React.createElement(VolumeHigh_1.default, null);
        if (volume === 0) {
            icon = React.createElement(VolumeMute_1.default, null);
        }
        else if (volume <= 0.5) {
            icon = React.createElement(VolumeLow_1.default, null);
        }
        return (React.createElement(Wrapper, { styles: styles },
            isOpen && (React.createElement(ClickOutside_1.default, { onClick: this.handleClick },
                React.createElement(react_range_slider_1.default, { axis: "y", classNamePrefix: "rrs", styles: {
                        options: {
                            handleBorder: "2px solid " + styles.color,
                            handleBorderRadius: 12,
                            handleColor: styles.bgColor,
                            handleSize: 12,
                            padding: 0,
                            rangeColor: styles.altColor || '#ccc',
                            trackColor: styles.color,
                            width: 6,
                        },
                    }, onClick: this.handleClick, onChange: this.handleChangeSlider, onDragEnd: this.handleDragEndSlider, y: volume * 100, yMin: 0, yMax: 100 }))),
            React.createElement("button", { type: "button", onClick: !isOpen ? this.handleClick : undefined }, icon)));
    };
    return Volume;
}(React.PureComponent));
exports.default = Volume;
