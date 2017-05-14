/**
 * Created by Kazeem Olanipekun <kezyolanipekun@gmail.com> on 13/05/2017.
 */
'use strict';
var dashboardView=angular.module('dashboardViewModule',['ui.bootstrap','contentInjectModule','textCapitalize']);
dashboardView.controller('dashboardViewSuperAdminCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.loading=true;
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };

        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();
    }]);
dashboardView.controller('dashboardViewSchoolAdminCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.loading=true;
        vm.loadingTotal={
            all_applicants:true,
            application_complete:true,
            screening_passed:true,
            female:true,
            male:true,
            admission_offered:true
        };
        vm.total={
            all_applicants:0,
            application_complete:0,
            screening_passed:0,
            female:0,
            male:0,
            admission_offered:0
        };
        var param={};
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession2=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                    param={status_stages:'APPLICATION_COMPLETE',session_id:vm.nonVerifiedActiveSession.id};
                    getTotalAdmitted('application_complete',param);
                }else{
                    vm.loadingTotal={
                        all_applicants:false,
                        application_complete:false,
                        screening_passed:false,
                        female:false,
                        male:false,
                        admission_offered:false
                    };
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };


        /**
         * This count total Admitted Applicants in the institution
         */
        var getTotalAdmitted=function (name,param) {
            var data={
                request:'countDataByParam',
                param:param
            };
            ApiHandler.callService('POST','userServices.php',data).then(function (resp) {
                console.log(name+'=',resp.data);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.total[name]=resp.data.data[0];
                }else{
                    vm.total[name]=0;
                }
                switch (name){
                    case'application_complete':
                        vm.loadingTotal[name]=false;
                        param={roles:'APPLICANT',session_id:vm.nonVerifiedActiveSession.id};
                        name='all_applicants';
                        break;
                    case'all_applicants':
                        vm.loadingTotal[name]=false;
                        param={status_stages:'SCREENING_PASSED',session_id:vm.nonVerifiedActiveSession.id};
                        name='screening_passed';
                        break;
                    case'screening_passed':
                        vm.loadingTotal[name]=false;
                        param={status:'ADMISSION_OFFERED',session_id:vm.nonVerifiedActiveSession.id};
                        name='admission_offered';
                        break;
                    case'admission_offered':
                        vm.loadingTotal[name]=false;
                        param={roles:'APPLICANT',sex:'Female',session_id:vm.nonVerifiedActiveSession.id};
                        name='female';
                        break;
                    case'female':
                        vm.loadingTotal[name]=false;
                        param={roles:'APPLICANT',sex:'Male',session_id:vm.nonVerifiedActiveSession.id};
                        name='male';
                        break;
                    case'male':
                        vm.loadingTotal[name]=false;
                        name='default';
                        break;
                    default:
                        name='default';
                        break;
                }
                if(name!='default') getTotalAdmitted(name,param);
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };

        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();

    }]);
dashboardView.controller('dashboardViewScreeningOfficerCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.loading=true;
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession2=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };
        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();


    }]);
dashboardView.controller('dashboardViewAdmissionOfficerCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.totalAdmittedInSession=0;
        vm.loading=true;
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession2=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                    getTotalAdmitted(); //get total Admitted
                }
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };

        /**
         * This count total Admitted Applicants in the institution
         */
        var getTotalAdmitted=function () {
            var data={
                request:'countDataByParam',
                param:{status:'ADMISSION_OFFERED',session_id:vm.nonVerifiedActiveSession.id}
            };
            ApiHandler.callService('POST','userServices.php',data).then(function (resp) {
                console.log('totalAdmittedInSession=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.totalAdmittedInSession=resp.data.data[0];
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };
        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();

    }]);
dashboardView.controller('dashboardViewBursarCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.loading=true;
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession2=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };
        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();

    }]);
dashboardView.controller('dashboardViewApplicantCtrl',['$scope','ApiHandler','Cache','$location',
    function($scope,ApiHandler,Cache,$location){
        var vm=this;
        vm.nonVerifiedActiveSession={};
        vm.loading=true;
        var path = $location.path();
        console.log('path=',path);
        /**
         * get Active with non verified Session with unavailablity of screening process.
         */
        var getActiveSession=function () {
            var data={
                request:'getSessionByParam',
                param:{active:1}
            };
            ApiHandler.callService('POST','sessionServices.php',data).then(function (resp) {
                console.log('nonVerifiedActiveSession2=',resp);
                if(resp.data!=undefined && resp.data.status==200) {
                    vm.nonVerifiedActiveSession=resp.data.data;
                }
                vm.loading=false;
            },function (err) {
                vm.loading=false;
                alert(err.data.message);
            });
        };
        /**
         *Load Dependencies
         */
        if(path=='/dashboard')
        getActiveSession();

    }]);
/**
 * This directive is used to inject dashboard view asynchronously based on user roles
 */
dashboardView.directive('smDashboardView', ['$compile','FetchUserTemplateService',function($compile, FetchUserTemplateService)
{
    return {
        replace:true,
        restrict:'E',
        scope:{
            role:'='
        },
        controller:['$scope',function ($scope) {
            console.log($scope.role);
        }],
        link:function($scope, $element)
        {
            switch($scope.role)
            {
                case 'SUPER_ADMIN':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/super-admin-view.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'SCHOOL_ADMIN':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/school-admin-view.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                case 'ICT_ADMIN':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/school-admin-view.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;

                case 'ADMISSION_OFFICER':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/admission-officer-view.html').then(function (response) {
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break;
                case 'SCREENING_OFFICER':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/screening-officer-view.html').then(function (response) {
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break;
                case 'APPLICANT':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/applicant-view.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);

                    });
                    break ;
                case 'BURSAR':
                    FetchUserTemplateService.fetchTemplate('views/dashboard/bursar-view.html').then(function(response){
                        var val = $compile(response)($scope);
                        $element.append(val);
                    });
                    break ;
                default:
                    break ;

            }
        }
    };

}]);