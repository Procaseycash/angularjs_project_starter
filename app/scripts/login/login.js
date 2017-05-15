/**
 * Created by Kazeem Olanipekun on 08/04/2017.
 */

'use strict';
// Declare app level module which depends on views, and components
var login=angular.module('loginModule', ['ui.router','cacheModule']);
login.controller('loginCtrl',['$scope','Cache','$state','$window',function ($scope,Cache,$state,$window) {
var vm=this;

vm.user={
	first_name:'Kazeem',
	last_name:'Olanipekun',
	middle_name:'Babatunde',
	roles:['APP_ADMIN','STUDENT','DEFAULT']
};

    /**
     * This is used to login user to application
     */
    $scope.login=function () {
      $state.go('dashboard');
    };


}]);
