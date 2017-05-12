/**
 * Created by Kazeem Olanipekun Babatunde on 12/12/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var api=angular.module('PageAccessModule',[]);
api.service('VerifyPage',['$http',function ($http) {
    this.AccessRole=function (roles,authorize) {
        var authLen=authorize.length;
        var count=0;
            for(var j=0;j<authLen;j++) {
                if (roles.indexOf(authorize[j])>-1) {
                    count += 1;
                }
            }
        return {count:count};
}
}]);