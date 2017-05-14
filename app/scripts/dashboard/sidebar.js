/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> <08135061846> on 08/12/2016.
 */
'use strict';
var sidebar=angular.module('SidebarModule',['contentInjectModule','cacheModule']);
/**
 * Side bar controller
 */
sidebar.controller('sideBarCtrl', ['$scope','$state','Cache', function($scope,$state,Cache)
{
    var vm=this;

}]);

/**
 * This directive is used to inject sidebar asynchronously based on user roles
 */
sidebar.directive('smSideBar', ['$compile','FetchUserTemplateService',function($compile, FetchUserTemplateService)
{
    return {
        replace:true,
        restrict:'E',
        scope:{
            role:'=',
            pause:'='
        },
        controller:['$scope',function ($scope) {
            console.log($scope.role);
        }],
        link:function($scope, $element)
        {
            switch($scope.role)
            {
                case 'APP_ADMIN':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/app-admin-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'SCHOOL_REPRESENTATIVE':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/school-rep-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'VOLUNTEER':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/volunteer-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;

                case 'INDIVIDUAL':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/individual-nav.html').then(function (response) {
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break;
                case 'ORGANIZATION':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/organization-nav.html').then(function (response) {
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break;
                case 'STUDENT':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/student-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);

                    });
                    break ;
                  case 'HOC':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/hoc-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'DRIVE_LEADER':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/drive-leader-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'DRIVE_MEMBER':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/drive-member-nav.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'DEFAULT':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/default-nav.html').then(function (response) {
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    //$scope.$parent.appTemplate();
                    break;
                default:
                    break ;

            }
        }
    };

}]);