/**
 * Created by Kazeem Olanipekun Babatunde on 22/03/2017.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var profileModule=angular.module('profileModule', ['ApiHandlerModule','cacheModule','AlertModule','textCapitalize','CheckEmailModule']);
profileModule.controller('profileManagementCtrl',['ApiHandler','Cache','$state','$scope','AlertService','EmailService','$filter',
    function (ApiHandler,Cache,$state,$scope,Alert,EmailService,$filter) {
    var vm=this;

}]);