/**
 * Created by Kazeem Olanipekun Babatunde on 12/12/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var api=angular.module('ApiHandlerModule',[]);
api.factory('ApiHandler',['$http',function ($http) {
return {
    callService: function (method, url, param) {
        var development = "http://localhost:8383/api/"+url;
        var production = "http://efiwe.org/api/"+url;
        return $http({
            method:method,
            url: development,
            data: param
        })}
}
}]);