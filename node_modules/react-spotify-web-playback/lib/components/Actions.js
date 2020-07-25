"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("../styles");
var Devices_1 = require("./Devices");
var Volume_1 = require("./Volume");
var Wrapper = styles_1.styled('div')({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: styles_1.px(10),
    '> div + div': {
        marginLeft: styles_1.px(10),
    },
    '@media (max-width: 599px)': {
        bottom: 0,
        position: 'absolute',
        right: 0,
        width: 'auto',
    },
}, function (_a) {
    var styles = _a.styles;
    return ({
        height: styles_1.px(styles.height),
    });
}, 'ActionsRSWP');
var Actions = function (_a) {
    var currentDeviceId = _a.currentDeviceId, devices = _a.devices, isDevicesOpen = _a.isDevicesOpen, onClickDevice = _a.onClickDevice, setVolume = _a.setVolume, styles = _a.styles, volume = _a.volume;
    return (React.createElement(Wrapper, { styles: styles },
        currentDeviceId && React.createElement(Volume_1.default, { volume: volume, setVolume: setVolume, styles: styles }),
        React.createElement(Devices_1.default, { deviceId: currentDeviceId, devices: devices, open: isDevicesOpen, onClickDevice: onClickDevice, styles: styles })));
};
exports.default = Actions;
