/**
 * Created by w1036_000 on 2017/7/6.
 */

const commonValues = require('./commonValues');
const commonMethods = require('./commonMethods');

const flyPositionConvertor = {};

const dealParam = function (param) {
    param = parseInt(param);
    if (isNaN(param)) {
        throw '传入的参数不是数字';
    } else {
        return param;
    }
};

/**
 * gcj坐标转百度坐标
 * */
flyPositionConvertor.gcj2bd = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    const x = lng, y = lat;
    const z = commonMethods.pythagorea(x, y) + 0.00002 * Math.sin(y * commonValues.X_PI);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * commonValues.X_PI);
    const lngResult = z * Math.cos(theta) + 0.0065;
    const latResult = z * Math.sin(theta) + 0.006;
    return {
        lng: lngResult,
        lat: latResult,
    };
};

/**
 * 百度坐标转gcj坐标
 * */
flyPositionConvertor.bd2gcj = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    const x = lng - 0.0065, y = lat - 0.006;
    const z = commonMethods.pythagorea(x, y) - 0.00002 * Math.sin(y * commonValues.X_PI);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * commonValues.X_PI);
    const lngResult = z * Math.cos(theta);
    const latResult = z * Math.sin(theta);
    return {
        lng: lngResult,
        lat: latResult,
    };
};

/**
 * wgs坐标转gcj坐标
 * */
flyPositionConvertor.wgs2gcj = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    let lngResult, latResult;
    if (commonMethods.outOfChina({lng: lng, lat: lat})) {
        lngResult = lng;
        latResult = lat;
    } else {
        let delta = commonMethods.delta({lng: lng, lat: lat});
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
flyPositionConvertor.gcj2wgs_fast = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    let lngResult, latResult;
    if (commonMethods.outOfChina({lng: lng, lat: lat})) {
        lngResult = lng;
        latResult = lat;
    } else {
        let delta = commonMethods.delta({lng: lng, lat: lat});
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
flyPositionConvertor.gcj2wgs_exactly = function ({lng, lat, threshold = 0.000000001, loopCount = 10000}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    const initDelta = 0.01;
    let dLat = initDelta, dLng = initDelta;
    let mLat = lat - dLat, mLng = lng - dLng;
    let pLat = lat + dLat, pLng = lng + dLng;
    let wgsLat, wgsLon;
    for (let i = 0; i < loopCount; i++) {
        wgsLat = (mLat + pLat) / 2;
        wgsLon = (mLng + pLng) / 2;
        const tmp = flyPositionConvertor.gcj2wgs_fast({lat: wgsLat, lng: wgsLon});
        dLat = tmp.lat - lat;
        dLng = tmp.lng - lng;
        if ((Math.abs(dLat) < threshold) && (Math.abs(dLng) < threshold))
            break;
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
    return {lat: wgsLat, lng: wgsLon};
};

/**
 * wgs坐标转墨卡托坐标
 * */
flyPositionConvertor.wgs2mercator = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    let x = lng * 20037508.34 / 180.;
    let y = Math.log(Math.tan((90 + lat) * commonValues.PI / 360)) / (commonValues.PI / 180.);
    y = y * 20037508.34 / 180.;
    return {lat: y, lng: x};
};

/**
 * 墨卡托坐标转wgs坐标
 * */
flyPositionConvertor.mercator2wgs = function ({lng, lat}) {
    lng = dealParam(lng);
    lat = dealParam(lat);
    let x = lng / 20037508.34 * 180.;
    let y = lat / 20037508.34 * 180.;
    y = 180 / this.PI * (2 * Math.atan(Math.exp(y * commonValues.PI / 180.)) - commonValues.PI / 2);
    return {'lat': y, 'lon': x};
};


module.exports = flyPositionConvertor;
