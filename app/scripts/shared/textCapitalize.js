/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> on 28/01/2017.
 */
'use strict';
var textCapitalization = angular.module("textCapitalize", []);

/**
 *
 * utility to capitalize the first letters of a word
 */
textCapitalization.filter('capitalize', function () {
        return function (input) {
                input+=' ';
                var new_input = '';
                var res = input.split(" ");//split with spaces
                for (var i = 0; i < res.length; i++)
                        new_input += res[i].charAt(0).toUpperCase() + res[i].substr(1).toLowerCase() + ' ';
                return (!!input) ? new_input : '';
        }
});


