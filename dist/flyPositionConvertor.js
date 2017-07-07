(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flyPositionConvertor"] = factory();
	else
		root["flyPositionConvertor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by w1036_000 on 2017/7/7.
 */

var commonValues = {};

commonValues.PI = Math.PI;
commonValues.X_PI = commonValues.PI * 3000 / 180;

commonValues.earthR = 6371000; //地球半径

//Krasovsky 1940
commonValues.A = 6378245; //卫星椭球坐标投影到平面地图坐标系的投影因子
commonValues.F = 1 / 298.3;
commonValues.B = commonValues.A * (1 - commonValues.F);
commonValues.EE = (commonValues.A * commonValues.A - commonValues.B * commonValues.B) / (commonValues.A * commonValues.A); //椭球的偏心率

module.exports = commonValues;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by w1036_000 on 2017/7/7.
 */

module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by w1036_000 on 2017/7/6.
 */

var commonValues = __webpack_require__(0);
var commonMethods = __webpack_require__(3);

var flyPositionConvertor = {};

/**
 * gcj坐标转百度坐标
 * */
flyPositionConvertor.gcj2bd = function (_ref) {
    var lng = _ref.lng,
        lat = _ref.lat;

    var x = lng,
        y = lat;
    var z = commonMethods.pythagorea(x, y) + 0.00002 * Math.sin(y * commonValues.X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * commonValues.X_PI);
    var lngResult = z * Math.cos(theta) + 0.0065;
    var latResult = z * Math.sin(theta) + 0.006;
    return {
        lng: lngResult,
        lat: latResult
    };
};

/**
 * 百度坐标转gcj坐标
 * */
flyPositionConvertor.bd2gcj = function (_ref2) {
    var lng = _ref2.lng,
        lat = _ref2.lat;

    var x = lng - 0.0065,
        y = lat - 0.006;
    var z = commonMethods.pythagorea(x, y) - 0.00002 * Math.sin(y * commonValues.X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * commonValues.X_PI);
    var lngResult = z * Math.cos(theta);
    var latResult = z * Math.sin(theta);
    return {
        lng: lngResult,
        lat: latResult
    };
};

/**
 * wgs坐标转gcj坐标
 * */
flyPositionConvertor.wgs2gcj = function (_ref3) {
    var lng = _ref3.lng,
        lat = _ref3.lat;

    var lngResult = void 0,
        latResult = void 0;
    if (commonMethods.outOfChina({ lng: lng, lat: lat })) {
        lngResult = lng;
        latResult = lat;
    } else {
        var delta = commonMethods.delta({ lng: lng, lat: lat });
        lngResult = lng + delta.lng;
        latResult = lat + delta.lat;
    }
    return {
        lng: lngResult,
        lat: latResult
    };
};

/**
 * gcj坐标转wgs坐标，快速转换
 * */
flyPositionConvertor.gcj2wgs_fast = function (_ref4) {
    var lng = _ref4.lng,
        lat = _ref4.lat;

    var lngResult = void 0,
        latResult = void 0;
    if (commonMethods.outOfChina({ lng: lng, lat: lat })) {
        lngResult = lng;
        latResult = lat;
    } else {
        var delta = commonMethods.delta({ lng: lng, lat: lat });
        lngResult = lng - delta.lng;
        latResult = lat - delta.lat;
    }
    return {
        lng: lngResult,
        lat: latResult
    };
};

/**
 * gcj坐标转wgs坐标，精确转换
 * threshold:Number 精准度阈值，当误差小于此值时停止计算
 * loopCount:Number 最大循环次数，当循环次数达到此值时停止计算
 * */
flyPositionConvertor.gcj2wgs_exactly = function (_ref5) {
    var lng = _ref5.lng,
        lat = _ref5.lat,
        _ref5$threshold = _ref5.threshold,
        threshold = _ref5$threshold === undefined ? 0.000000001 : _ref5$threshold,
        _ref5$loopCount = _ref5.loopCount,
        loopCount = _ref5$loopCount === undefined ? 10000 : _ref5$loopCount;

    var initDelta = 0.01;
    var dLat = initDelta,
        dLng = initDelta;
    var mLat = lat - dLat,
        mLng = lng - dLng;
    var pLat = lat + dLat,
        pLng = lng + dLng;
    var wgsLat = void 0,
        wgsLon = void 0;
    for (var i = 0; i < loopCount; i++) {
        wgsLat = (mLat + pLat) / 2;
        wgsLon = (mLng + pLng) / 2;
        var tmp = flyPositionConvertor.gcj2wgs_fast({ lat: wgsLat, lng: wgsLon });
        dLat = tmp.lat - lat;
        dLng = tmp.lng - lng;
        if (Math.abs(dLat) < threshold && Math.abs(dLng) < threshold) break;
        if (dLat > 0) {
            pLat = wgsLat;
        } else {
            mLat = wgsLat;
        }
        if (dLng > 0) {
            pLng = wgsLon;
        } else {
            mLng = wgsLon;
        }
    }
    return { lat: wgsLat, lng: wgsLon };
};

/**
 * wgs坐标转墨卡托坐标
 * */
flyPositionConvertor.wgs2mercator = function (_ref6) {
    var lng = _ref6.lng,
        lat = _ref6.lat;

    var x = lng * 20037508.34 / 180.;
    var y = Math.log(Math.tan((90 + lat) * commonValues.PI / 360)) / (commonValues.PI / 180.);
    y = y * 20037508.34 / 180.;
    return { lat: y, lng: x };
};

/**
 * 墨卡托坐标转wgs坐标
 * */
flyPositionConvertor.mercator2wgs = function (_ref7) {
    var lng = _ref7.lng,
        lat = _ref7.lat;

    var x = lng / 20037508.34 * 180.;
    var y = lat / 20037508.34 * 180.;
    y = 180 / this.PI * (2 * Math.atan(Math.exp(y * commonValues.PI / 180.)) - commonValues.PI / 2);
    return { 'lat': y, 'lon': x };
};

module.exports = flyPositionConvertor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by w1036_000 on 2017/7/7.
 */

var commonValues = __webpack_require__(0);

var commonMethods = {};

/**
 * 已知直角三角形两边长，求斜边长
 * x,y:Number 直角三角形的两边长
 * 返回值：Number 求得的斜边长
 * */
commonMethods.pythagorea = function (x, y) {
    return Math.sqrt(x * x + y * y);
};

/**
 * 计算两个坐标点的距离
 * */
commonMethods.pointsDistance = function (_ref) {
    var lngA = _ref.lngA,
        lngB = _ref.lngB,
        latA = _ref.latA,
        latB = _ref.latB;

    var x = Math.cos(latA * commonValues.PI / 180.) * Math.cos(latB * commonValues.PI / 180.) * Math.cos((lngA - lngB) * commonValues.PI / 180);
    var y = Math.sin(latA * commonValues.PI / 180.) * Math.sin(latB * commonValues.PI / 180.);
    var s = x + y;
    if (s > 1) {
        s = 1;
    } else if (s < -1) {
        s = -1;
    }
    var alpha = Math.acos(s);
    return alpha * commonValues.earthR;
};

/**
 * 判断坐标是否不在中国范围内
 * */
commonMethods.outOfChina = function (_ref2) {
    var lng = _ref2.lng,
        lat = _ref2.lat;

    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
};

/**
 * krasovsky坐标处理
 * */
commonMethods.delta = function (_ref3) {
    var lng = _ref3.lng,
        lat = _ref3.lat;

    function transformLat(_ref4) {
        var lng = _ref4.lng,
            lat = _ref4.lat;

        var x = lng - 105,
            y = lat - 35;
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * commonValues.PI) + 20.0 * Math.sin(2.0 * x * commonValues.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * commonValues.PI) + 40.0 * Math.sin(y / 3.0 * commonValues.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * commonValues.PI) + 320 * Math.sin(y * commonValues.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLng(_ref5) {
        var lng = _ref5.lng,
            lat = _ref5.lat;

        var x = lng - 105,
            y = lat - 35;
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * commonValues.PI) + 20.0 * Math.sin(2.0 * x * commonValues.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * commonValues.PI) + 40.0 * Math.sin(x / 3.0 * commonValues.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * commonValues.PI) + 300.0 * Math.sin(x / 30.0 * commonValues.PI)) * 2.0 / 3.0;
        return ret;
    }

    var dLat = transformLat({ lng: lng, lat: lat });
    var dLng = transformLng({ lng: lng, lat: lat });
    var radLat = lat / 180 * commonValues.PI;
    var magic = Math.sin(radLat);
    magic = 1 - commonValues.EE * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = dLat * 180 / (commonValues.A * (1 - commonValues.EE) / (magic * sqrtMagic) * commonValues.PI);
    dLng = dLng * 180 / (commonValues.A / sqrtMagic * Math.cos(radLat) * commonValues.PI);
    return {
        lng: dLng,
        lat: dLat
    };
};

module.exports = commonMethods;

/***/ })
/******/ ]);
});