/**
 * Created by Kazeem Olanipekun Babatunde on 13/12/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var indexModule=angular.module('indexModule', ['ApiHandlerModule','cacheModule']);
indexModule.controller('indexCtrl',['ApiHandler','Cache','$state', function (ApiHandler,Cache,$state) {
var vm=this;

    console.log('This is the Index Page');

    /**
     * This is a sample of ApiHandler usage to request and get response from api
     */
    vm.sampleOfHandlerUsage=function () {
    ApiHandler.callService('GET','user/login',data).then(function (resp) {
        if(resp.data!=undefined && resp.status==200) {
            console.log('This is a response', resp);
        }else console.log('Error Occured');
    },function (err) {
        console.log(err);
    });
}

}]);
