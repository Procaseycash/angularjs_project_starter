/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> on 13/12/2016.
 */
'use strict';
var checkEmail=angular.module('CheckEmailModule',[]);
checkEmail.service('EmailService',['$log',function ($log) {
    return{
        checkEmail:function (email) {
            email=email.toLowerCase();
            var atPos=email.indexOf("@");
            var dotPos=email.lastIndexOf(".");
           return (!((atPos<1 || dotPos-atPos<2) || email==null));

        }
    };
}]);
