/**
 * Created by Kazeem Olanipekun Babatunde on 13/12/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var indexModule=angular.module('indexModule', ['ApiHandlerModule','cacheModule']);
indexModule.controller('indexCtrl',['ApiHandler','Cache','$state', '$scope',function (ApiHandler,Cache,$state,$scope) {
var vm=this;

    console.log('This is the Index Page');

    /**
     * This is a sample of ApiHandler usage to request and get response from api
     */
    vm.sampleOfHandlerUsage=function () {
    ApiHandler.callService('GET','user/login',data).then(function (resp) {
        if(resp.data!=undefined && resp.status==200) {
            console.log('This is a response', resp);
        }else console.log('Error Occured');
    },function (err) {
        console.log(err);
    });
};

/**
*Page Scroll by Content Id
*/
    $scope.loadWithPage=function (hashTag) {
                    var hash = hashTag;
                    console.log('hash='+hash);
                    if(hash.indexOf(1)=='/') return;
                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 900, function(){

              $(window).scroll(function() {
                $(".slideanim").each(function(){
                    var pos = $(this).offset().top;

                    var winTop = $(window).scrollTop();
                    if (pos < winTop + 600) {
                        $(this).addClass("slide");
                    }
                });
            });
        })
    };

}]);
