/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> on 15/02/2017.
 */
'use strict';

var interceptor=angular.module('interceptorModule',['cacheModule']);
interceptor.factory('interceptRequest',['Cache','$q','$rootScope',function (Cache,$q,$rootScope) {
    return{
        request:function (config) {
            config.requestTimestamp = new Date().getTime();
            config.headers = config.headers || {};

            if(Cache.getCookie('token'))
            config.headers.Authorization = 'screeningManager ' + Cache.getCookie('token'); // add your token from your service or whatever

            config.headers['Content-Type']=undefined;
            //console.log('requestTime=',config.requestTimestamp);
            return config;
        },
        response:function (config) {
            config.reponseTimestamp = new Date().getTime();
            //console.log('ReplyData=',config.reponseTimestamp);
            return config;
        },
        responseError:function (err) {
            if (err.status === 401 || err.status === 500) {
                $rootScope.$broadcast('unauthorized');
            }
            return err;
        }
    }
}]);