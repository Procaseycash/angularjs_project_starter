/**
 * Created by Kazeem Olanipekun Babatunde on 23/03/2017.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var miscellaneousModule=angular.module('miscellaneousModule',
    ['ApiHandlerModule','AlertModule','cacheModule','tokenMsgModule','CheckEmailModule']);
miscellaneousModule.controller('verifyAccountCtrl',['$scope','ApiHandler','AlertService','Cache','$state','$stateParams', function ($scope,ApiHandler,Alert,Cache,$state,$stateParams) {
    var vm=this;
    vm.user=undefined;
    vm.applicantToken=$stateParams.applicantToken;
    vm.visible={
        open:false,
        message:'Loading resources. Please wait...',
        opener:true,
        hide:false
    };

    /**
     * Verify Account For Registered Applicants
     */
    var verifyAccount=function () {
        var message='';
        if (vm.applicantToken) { //verifying account
            var data = {
                request: 'verifyApplicantRegistration',
                key: vm.applicantToken
            };
            vm.visible.opener = true;
            vm.visible.message ="Verifying account, Please wait...";
            ApiHandler.callService('POST', 'userServices.php', data)
                .then(function (resp) {
                        console.log('verifyAccount', resp.data);
                        if (resp.data != undefined && resp.data.status == 200) {
                            message=' <p><i class="fa fa-info-circle"></i> Account Verified Successfully. Please <a href="/#/login" style="color:blue" role="button"><b>Login</b></a>.</p>';
                            $('#messageVerify').css('display', 'block').html(message);
                            console.log('verifyAccount', resp.data);
                            Cache.set('user', resp.data.data);
                        } else {
                            message=' <p><i class="fa fa-info-circle"></i> '+resp.data.message+' Please <a href="/#/login" style="color:blue" role="button"><b>Login</b></a></p>';
                            $('#messageVerify').css('display', 'block').html(message);
                        }
                        vm.visible.opener = false;
                    },
                    function (err) {
                        message=' <p><i class="fa fa-info-circle"></i> '+err.data.message+'</p>';
                        $('#messageVerify').css('display', 'block').html(message);
                        vm.visible.opener = true;
                        //alert('Error encountered while verifying user state');
                    });
        } else {
            message='<p><i class="fa fa-info-circle"></i> No Verification Code Present</p>';
            $('#messageVerify').css('display', 'block').html(message);
            vm.visible.opener = true;
        }
    };

    /**
     * Load Dependencies
     */
    verifyAccount();
}]);
miscellaneousModule.controller('forgetPasswordCtrl',['$scope','ApiHandler','AlertService','Cache','$state','$stateParams','EmailService', function ($scope,ApiHandler,Alert,Cache,$state,$stateParams,EmailService) {
    var vm=this;
    vm.user=undefined;
    vm.loader={
        msg:'Processing,please wait...',
        load:false
    };
    vm.passwordChange={
        email:undefined,
        request:'forgetAccountPassword',
        password:undefined
    };

    /**
     * This function is used to change user password
     */
    vm.changePassword=function () {
        if(vm.passwordChange.password==undefined)
            return Alert.error({message:'Please Enter a new Password',header:''});

        if(!EmailService.checkEmail(vm.passwordChange.email))
            return  Alert.error({message:'Invalid email or email field not filled.',header:''});

        vm.loader.load=true;
        vm.loader.msg='Processing...';
        ApiHandler.callService('POST','userServices.php',vm.passwordChange).then(function (resp) {
            console.log('myInstitute=',resp);
            if(resp.data!=undefined && resp.data.status==200) {
                Alert.success({message:'Password Changed Successfully',header:''});
                $('#cleanPassword_')[0].reset();
            }else{
                Alert.error({message:'Invalid Email Provided with Error: '+resp.data.message,header:''});
            }
            vm.loader.load=false;
        },function (err) {
            vm.loader.load=false;
            //alert('Error encountered while loading Institution');
            console.log(err);
        });
    };

}]);