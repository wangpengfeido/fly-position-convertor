/**
 * Created by w1036_000 on 2017/7/7.
 */

(function () {
    var wgsLngDom = document.querySelector('#wgs .inp_lng');
    var wgsLatDom = document.querySelector('#wgs .inp_lat');
    var gcjLngDom = document.querySelector('#gcj .inp_lng');
    var gcjLatDom = document.querySelector('#gcj .inp_lat');
    var mercatorLngDom = document.querySelector('#mercator .inp_lng');
    var mercatorLatDom = document.querySelector('#mercator .inp_lat');
    var bdLngDom = document.querySelector('#bd .inp_lng');
    var bdLatDom = document.querySelector('#bd .inp_lat');
    var wgsButton = document.querySelector('#wgs button');
    var gcjButton = document.querySelector('#gcj button');
    var mercatorButton = document.querySelector('#mercator button');
    var bdButton = document.querySelector('#bd button');

    wgsButton.addEventListener('click', function () {
        const wgs = {lng: wgsLngDom.value, lat: wgsLatDom.value};
        const gcj = flyPositionConvertor.wgs2gcj(wgs);
        const mercator = flyPositionConvertor.wgs2mercator(wgs);
        const bd = flyPositionConvertor.gcj2bd(gcj);
        wgsLngDom.value=wgs.lng;
        wgsLatDom.value=wgs.lat;
        gcjLngDom.value=gcj.lng;
        gcjLatDom.value=gcj.lat;
        mercatorLngDom.value=mercator.lng;
        mercatorLatDom.value=mercator.lat;
        bdLngDom.value=bd.lng;
        bdLatDom.value=bd.lat;
    });


}());