
 /**
 * Created by Kazeem Olanipekun Babatunde on 27/08/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
/**
 * This Service is used to generate default Passwords.
 */
'use strict';
var app = angular.module('awPasswordGenerator', []);
app.service('PasswordService', function() {
  this.passwordGenerator = function () {
    var string = "1234567890ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*()_+-";
    var password='';
    for (var i = 0; i < 8; i++) {
      var stringVal = Math.floor(Math.random() * string.length);
      password+= string.charAt(stringVal);
    }
    return password;
  }
});

/**
 * End Default Password Service
 */
