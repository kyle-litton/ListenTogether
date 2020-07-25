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
var ClickOutside_1 = require("./ClickOutside");
var Devices_1 = require("./icons/Devices");
var Wrapper = styles_1.styled('div')({
    position: 'relative',
    zIndex: 20,
    '> div': {
        bottom: '120%',
        display: 'flex',
        flexDirection: 'column',
        padding: styles_1.px(8),
        position: 'absolute',
        right: "-" + styles_1.px(3),
        button: {
            display: 'block',
            padding: styles_1.px(8),
            whiteSpace: 'nowrap',
            '&.rswp__devices__active': {
                fontWeight: 'bold',
            },
        },
    },
    '> button': {
        fontSize: styles_1.px(26),
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
            button: {
                color: styles.color,
            },
        },
    });
}, 'DevicesRSWP');
var Devices = (function (_super) {
    __extends(Devices, _super);
    function Devices(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickSetDevice = function (e) {
            var onClickDevice = _this.props.onClickDevice;
            var dataset = e.currentTarget.dataset;
            if (dataset.id) {
                onClickDevice(dataset.id);
                _this.setState({ isOpen: false });
            }
        };
        _this.handleClickToggleDevices = function () {
            _this.setState(function (state) { return ({ isOpen: !state.isOpen }); });
        };
        _this.state = {
            isOpen: props.open,
        };
        return _this;
    }
    Devices.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, deviceId = _a.deviceId, devices = _a.devices, styles = _a.styles;
        return (React.createElement(Wrapper, { styles: styles }, !!devices.length && (React.createElement(React.Fragment, null,
            isOpen && (React.createElement(ClickOutside_1.default, { onClick: this.handleClickToggleDevices }, devices.map(function (d) { return (React.createElement("button", { key: d.id, className: d.id === deviceId ? 'rswp__devices__active' : undefined, "data-id": d.id, onClick: _this.handleClickSetDevice, type: "button" }, d.name)); }))),
            React.createElement("button", { type: "button", onClick: this.handleClickToggleDevices },
                React.createElement(Devices_1.default, null))))));
    };
    return Devices;
}(React.PureComponent));
exports.default = Devices;
