/**
 * Created by Kazeem Olanipekun Babatunde on 13/12/2016.
 * Email: kezyolanipekun@gmail.com <kezyolanipekun@gmail.com>
 * Phone: 08135061846
 */
'use strict';
var tokenMsg=angular.module('tokenMsgModule',['ui.bootstrap']);
tokenMsg.directive('tokenMsg',function () {
    return {
        restrict : "E",
        scope : {
            message:'=',
            visible:'=',
            fillColor:'=?',
            textColor:'=?'
        },
        controller:['$scope',function ($scope) {
            $scope.fillColor='#2A3F54';
            $scope.textColor='#fff';
            //$scope.visible=false;
        }],
        templateUrl :"views/shared/tokenMsg.html"
    };
});