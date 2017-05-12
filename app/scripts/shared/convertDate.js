
 /**
 * Created by Kazeem Olanipekun Babatunde on 25/01/2017.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
/**
 * This Service is used to generate default Passwords.
 */
'use strict';
var app = angular.module('zwDateConverter', []);
app.service('DateService',['$filter', function($filter) {
  this.convert = function (date,format,conversionType) {
    if(conversionType=='filter')
    return $filter('date')(date,format);
    else
       return new Date(date);
  }
}]);

/**
 * End Date  Service
 */
