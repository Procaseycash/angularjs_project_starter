/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> <08135061846> on 13/05/2017.
 */
'use strict';
var dashboard=angular.module('dashboardModule',['SidebarModule','ApiHandlerModule','cacheModule','profileModule','miscellaneousModule','ui.bootstrap','dashboardViewModule']);
dashboard.controller('dashboardCtrl',['$scope','ApiHandler','Cache','$state','$q','$rootScope','$uibModal',
    function($scope,ApiHandler,Cache,$state,$q,$rootScope,$uibModal){
console.log('this is dashboard');
$scope.user={
    roles:['APP_ADMIN','STUDENT','DEFAULT']
};

var welcome=function () {
    $(document).ready(function () {
        var unique_id = $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Welcome to App Starter!',
            // (string | mandatory) the text inside the notification
            text: ' We delighted to have you here and I hope you day has been going on good? Visit <a href="https://twitter.com/EfiweOrg" target="_blank" style="color:#ffd777">Efiwe Twitter</a>.',
            // (string | optional) the image to display on the left
            image: 'images/kazeem.jpg',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: true,
            // (int | optional) the time you want it to be alive for before fading out
            time: '',
            // (string | optional) the class name you want to apply to that specific message
            class_name: 'my-sticky-class'
        });

        return false;
    });
};

        /**
         * Page init Load
          */
        welcome();

}]);
