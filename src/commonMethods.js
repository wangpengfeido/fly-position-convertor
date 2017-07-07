/**
 * Created by w1036_000 on 2017/7/7.
 */

const commonValues = require('./commonValues');

const commonMethods = {};

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
commonMethods.pointsDistance = function ({lngA, lngB, latA, latB}) {
    const x = Math.cos(latA * commonValues.PI / 180.) * Math.cos(latB * commonValues.PI / 180.) * Math.cos((lngA - lngB) * commonValues.PI / 180);
    const y = Math.sin(latA * commonValues.PI / 180.) * Math.sin(latB * commonValues.PI / 180.);
    let s = x + y;
    if (s > 1) {
        s = 1;
    } else if (s < -1) {
        s = -1;
    }
    const alpha = Math.acos(s);
    return alpha * commonValues.earthR;
};

/**
 * 判断坐标是否不在中国范围内
 * */
commonMethods.outOfChina = function ({lng, lat}) {
    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
};

/**
 * krasovsky坐标处理
 * */
commonMethods.delta = function ({lng, lat}) {
    function transformLat({lng, lat}) {
        const x = lng - 105, y = lat - 35;
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * commonValues.PI) + 20.0 * Math.sin(2.0 * x * commonValues.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * commonValues.PI) + 40.0 * Math.sin(y / 3.0 * commonValues.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * commonValues.PI) + 320 * Math.sin(y * commonValues.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLng({lng, lat}) {
        const x = lng - 105, y = lat - 35;
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * commonValues.PI) + 20.0 * Math.sin(2.0 * x * commonValues.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * commonValues.PI) + 40.0 * Math.sin(x / 3.0 * commonValues.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * commonValues.PI) + 300.0 * Math.sin(x / 30.0 * commonValues.PI)) * 2.0 / 3.0;
        return ret;
    }

    let dLat = transformLat({lng: lng, lat: lat});
    let dLng = transformLng({lng: lng, lat: lat});
    let radLat = lat / 180 * commonValues.PI;
    let magic = Math.sin(radLat);
    magic = 1 - commonValues.EE * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180) / ((commonValues.A * (1 - commonValues.EE)) / (magic * sqrtMagic) * commonValues.PI);
    dLng = (dLng * 180) / (commonValues.A / sqrtMagic * Math.cos(radLat) * commonValues.PI);
    return {
        lng: dLng,
        lat: dLat,
    };
};

module.exports = commonMethods;


