/**
 * Created by Kazeem Olanipekun Babatunde on 12/12/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var cache=angular.module('cacheModule',['encryptModule']);

/**
 * This factory is used to cache object in browser
 */
cache.factory('Cache',['cryptMe',function (cryptMe) {
   return{
       set:function (name,data) {
           if (typeof(Storage) !== "undefined") {
               localStorage.setItem(data);
               cryptMe.setCookie('token',data,3.5);
           }
       },
       get:function (name) {
           if (typeof(Storage) !== "undefined") {
               if(localStorage.getItem(name)==undefined) {this.unset('user'); return null;}
               return cryptMe.jwtDecrypt(localStorage.getItem(name));
           } else {
               return 0;
           }
       },
       getCookie:function (cname) {
           if (typeof(Storage) !== "undefined") {
               var name = cname + "=";
               var decodedCookie = decodeURIComponent(document.cookie);
               var ca = decodedCookie.split(';');
               for(var i = 0; i <ca.length; i++) {
                   var c = ca[i];
                   while (c.charAt(0) == ' ') {
                       c = c.substring(1);
                   }
                   if (c.indexOf(name) == 0) {
                       return c.substring(name.length, c.length)||undefined;
                   }
               }
               return "";
           } else {
               return 0;
           }
       },
       unset: function (name) {
           if (typeof(Storage) !== "undefined") {
               localStorage.removeItem(name);
               var d = new Date();
               d.setTime(d.getTime() - (12*24*60*60*1000));
               var expires = "expires="+ d.toUTCString();
               document.cookie = 'token' + "=" + undefined + ";" + expires + ";path=/";
           }
       }
   }
}]);
