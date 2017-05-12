'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
/**
 * Created by Kazeem Olanipekun on 13/12/2016.
 * alert.js AlertModule to hold module
 */
var alertModule = angular.module('AlertModule', []);

/**
 *
 * Alert Module Controller
 *
 *
 */
alertModule.controller('alertController', ['$rootScope','$timeout','emAlertConfig','$scope', function($rootScope, $timeout, emAlertConfig, $scope)
{
    $rootScope.alert = {
        header: '',
        class_value: 'hidden',
        message: ''
    };

    $scope.closeAlert = function(){
        $rootScope.alert = {
            header: '',
            class_value: 'hidden',
            message: ''
        };
    };

}]);

//noinspection JSUnresolvedFunction
/**
 *
 * Alert service to be called by other modules
 *
 */
alertModule.factory('AlertService', ['$rootScope','$timeout','emAlertConfig', function($rootScope, $timeout, emAlertConfig)
{
    var alertService = {};

    /**
     *
     * Alert info attached to $rootscope
     *  @param message The message to display
     *  @param header The header to display
     */
    alertService.info = function(alertVal)
    {
        resetAlert();
        $rootScope.alert = {
            class_value: 'alert alert-info animated fadeIn',
            header: alertVal.header,
            message: alertVal.message,
            fa:'fa fa-info-circle'
        };

        $timeout(resetAlert, emAlertConfig.ALERT_VISIBLE_TIME);
    };

    alertService.error = function(alertVal)
    { resetAlert();
        $rootScope.alert = {
            class_value: 'alert alert-danger animated jello',
            header: alertVal.header,
            message: alertVal.message,
            fa:'fa fa-exclamation-triangle'
        };

        $timeout(resetAlert, emAlertConfig.ALERT_VISIBLE_TIME);
    };

    alertService.success= function(alertVal)
    { resetAlert();
        $rootScope.alert = {
            class_value: 'alert alert-success animated pulse',
            header: alertVal.header,
            message: alertVal.message,
            fa:'fa fa-check'
        };
        $timeout(resetAlert, emAlertConfig.ALERT_VISIBLE_TIME);
    };

    alertService.warning = function(alertVal)
    { resetAlert();
        $rootScope.alert = {
            class_value: 'alert alert-warning animated tada',
            header: alertVal.header,
            message: alertVal.message,
            fa:'fa fa-exclamation'
        };
        $timeout(resetAlert, emAlertConfig.ALERT_VISIBLE_TIME);
    };

    /**
     *
     *
     *   Function to reset the alert once it passes emAlertConfig.ALERT_VISIBLE_TIME
     *
     */
    function resetAlert()
    {
        $rootScope.alert = {
            header: '',
            class_value: 'hidden',
            message: ''
        };

    }
    return alertService;

}]);

//noinspection JSUnresolvedFunction
/**
 * Alert constants
 *
 **/
alertModule.constant('emAlertConfig', {
    ALERT_VISIBLE_TIME: 25000 // in milliseconds
});
//noinspection JSUnresolvedFunction
/**
 *
 * Alert Directive Setup
 *
 */
alertModule.directive('alert',  function()
{
    return {
        controller: 'alertController',
        restrict: 'E',
        templateUrl: 'views/shared/alert.html',
        scope:true

    };
});