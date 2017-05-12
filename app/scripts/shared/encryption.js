/**
 * Created by Kazeem Olanipekun Babatunde on 14/02/2017.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var dataUge=angular.module('encryptModule',[]);

/**
 * This factory is used to cache object in browser
 */
dataUge.service('cryptMe',[function () {
    return{
        jwtDecrypt: function(token) {
             if(token=='')return ;
            //console.log('lll',token);
            var base64Url = token.split('.');
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        },
        setCookie:function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            console.log('thisCookie',new Date(d.getTime() + (exdays * 24 * 60 * 60 * 1000)));
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        }
}]);
