/**
 * Created by Tyger  on 17/12/2016 and modified by Kazeem Olanipekun<kezyolanipekun@gmail.com>
 */
'use strict';
var contentInject=angular.module('contentInjectModule',[]);
/**
 * This factory is used to inject templates into side bar
 */
contentInject.factory('FetchUserTemplateService', ['$http','$q', function($http, $q){
    return {

        fetchTemplate: function(url)
        {
            var def = $q.defer();
            $http.get(url).then(function(resp) {
                def.resolve(resp.data);
            },   function() {
                def.reject("Failed to get user template");
            });
            return def.promise;

        }

    };
}]);