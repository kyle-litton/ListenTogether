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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var exenv_1 = require("exenv");
exports.canUseDOM = function () { return exenv_1.canUseDOM; };
exports.STATUS = {
    ERROR: 'ERROR',
    IDLE: 'IDLE',
    INITIALIZING: 'INITIALIZING',
    READY: 'READY',
    RUNNING: 'RUNNING',
    UNSUPPORTED: 'UNSUPPORTED',
};
exports.TYPE = {
    DEVICE: 'device_update',
    PLAYER: 'player_update',
    STATUS: 'status_update',
    TRACK: 'track_update',
};
function getSpotifyURIType(uri) {
    var _a = __read(uri.split(':'), 2), _b = _a[1], type = _b === void 0 ? '' : _b;
    return type;
}
exports.getSpotifyURIType = getSpotifyURIType;
function isEqualArray(A, B) {
    if (!Array.isArray(A) || !Array.isArray(B) || A.length !== B.length) {
        return false;
    }
    var result = true;
    A.forEach(function (a) {
        return B.forEach(function (b) {
            result = a === b;
        });
    });
    return result;
}
exports.isEqualArray = isEqualArray;
function loadScript(attributes) {
    if (!attributes || !attributes.source) {
        throw new Error('Invalid attributes');
    }
    return new Promise(function (resolve, reject) {
        var _a = __assign({ async: false, defer: false, source: '' }, attributes), async = _a.async, defer = _a.defer, id = _a.id, source = _a.source;
        var scriptTag = document.getElementById('spotify-player');
        if (!scriptTag) {
            var script = document.createElement('script');
            script.id = id || '';
            script.type = 'text/javascript';
            script.async = async;
            script.defer = defer;
            script.src = source;
            script.onload = function () { return resolve(undefined); };
            script.onerror = function (error) { return reject("createScript: " + error.message); };
            document.head.appendChild(script);
        }
        else {
            resolve();
        }
    });
}
exports.loadScript = loadScript;
function validateURI(input) {
    var isValid = false;
    if (input && input.indexOf(':') > -1) {
        var _a = __read(input.split(':'), 3), key = _a[0], type = _a[1], id = _a[2];
        if (key && type && type !== 'user' && id && id.length === 22) {
            isValid = true;
        }
    }
    return isValid;
}
exports.validateURI = validateURI;
