/**
 * Created by w1036_000 on 2017/7/7.
 */

const commonValues = {};

commonValues.PI = Math.PI;
commonValues.X_PI = commonValues.PI * 3000 / 180;

commonValues.earthR = 6371000;         //地球半径

//Krasovsky 1940
commonValues.A = 6378245;    //卫星椭球坐标投影到平面地图坐标系的投影因子
commonValues.F = 1 / 298.3;
commonValues.B = commonValues.A * (1 - commonValues.F);
commonValues.EE = (commonValues.A * commonValues.A - commonValues.B * commonValues.B) / (commonValues.A * commonValues.A);      //椭球的偏心率

module.exports = commonValues;