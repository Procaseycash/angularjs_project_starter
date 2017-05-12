/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com>
 */
'use strict';
// Declare app level module which depends on views, and components
var efiweWeb=angular.module('efiweWeb', ['ui.router','cacheModule','angular-loading-bar','indexModule','interceptorModule']);

/**
 *
 * Handling for page processing before display
 *
 */
efiweWeb.run(["$rootScope", "$state", 'Cache',function ($rootScope, $state,Cache) {
    $rootScope.$on('$stateChangeStart', function (event, to,current) {
      console.log('current=',current,'to=',to['url']);
    });
}]);


efiweWeb.config(['$stateProvider', '$urlRouterProvider','cfpLoadingBarProvider','$httpProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider,cfpLoadingBarProvider,$httpProvider,$locationProvider) {
    $httpProvider.interceptors.push('interceptRequest'); //adding header to request sent.
    $urlRouterProvider.otherwise("/page-not-found");
    $locationProvider.hashPrefix('');

  /**
   *   State for the very first page of the app. This is the home page .
   */
  $stateProvider.state('home', {
    url: "/",
    templateUrl: 'views/',
    controller: 'indexCtrl',
    controllerAs:'vm'
  });


    /**
     * Start miscellaneous in application
     */

    $stateProvider.state('page-not-found',{
        url:'/page-not-found',
        templateUrl: 'views/miscellaneous/page_not_found.html'
    });

    $stateProvider.state('forget-password',{
        url:'/forget-password',
        templateUrl: 'views/miscellaneous/forget_password.html',
        controller: 'forgetPasswordCtrl',
        controllerAs:'vm'
    });

    /**
     * End miscellaneous process in application
     */

}]);
efiweWeb.controller('efiweWebCtrl',['$scope','$rootScope','Cache','$state','$window',function ($scope,$rootScope,Cache,$state,$window) {

    /**
     * Setting copyright year
     * @type {number}
     */
    $scope.creation=new Date().getFullYear();

    /**
     * This is used to handle unauthorized login user.
     */
    $rootScope.$on('unauthorized',function () {
       $scope.logout();
    });

    /**
     * This is used to logout user from application
     */
    $scope.logout=function () {
        Cache.unset('user');
        //$state.go('login');
    };

    /**
     * Goto Previous url when is not found
     */
    $scope.goBackUrl=function () {
        $window.history.back();
    };


    /**
     * Check Active Page
     * @type {number}
     */
       var inActive=300000;
    var countT=0;
    var TCounter=setTimeout($scope.logout, inActive);
  $rootScope.$on('activePage',function () {
      $('body').bind('mouseover mousemove click keypress keydown', function(event) {
          clearTimeout(TCounter);
          console.log('kk');
          TCounter=setTimeout($scope.logout, inActive);
      });
  });
    

}]);
