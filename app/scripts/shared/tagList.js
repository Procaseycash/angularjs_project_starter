/**
 * Created by Kazeem Olanipekun Babatunde on 18/12/2016.
 * Email: kezyolanipekun@gmail.com <kezyolanipekun@gmail.com>
 * Phone: 08135061846
 */
'use strict';
var tagListModule=angular.module('tagListModule',['ui.bootstrap','AlertModule']);
tagListModule.directive('tagList',function () {
    return {
        restrict : "E",
        scope : {
            data:'=',
            oldData:'=?',
            fieldA:'=',
            fieldB:'=?',
            allowField:'=',
            title:'=',
            caller:'&?'
        },
        controller:['$scope','$filter','AlertService',function ($scope,$filter,Alert) {
            $scope.edit={};
            $scope.valueData=[];

            /**
             * To response to form cloae
             */
            $scope.$on('closeForm',function (evt,data) {
                $scope.edit={};
                $scope.data=[];
            });

            /**
             * To get data created and send to controller
             */
            $scope.$on('getData',function (evt,data) {
                $scope.caller({data:$scope.valueData});
            });

            /**
             * To Insert Data and show content
             */
            $scope.$on('insertData',function (evt,data) {
                console.log('disMDA=',data);
                $scope.valueData=[];
                angular.forEach(data,function (value,i) {
                    if(value!='') {
                        $scope.valueData.push(value);
                        $scope.edit[$scope.fieldA] = value;
                        $scope.data.push(angular.copy($scope.edit));
                        $scope.edit = {};
                    }
                });
            });

            /**
             * Add a Tag to List
             */
            $scope.addTag=function (a,b) {
                if($scope.fieldA!=undefined && a==undefined)
                    return Alert.error({message:'Enter '+$scope.title+' '+$scope.fieldA,header:''});
                if($scope.fieldB!=undefined && b==undefined)
                    return Alert.error({message:'Enter '+$scope.title+' '+$scope.fieldB,header:''});

                $scope.edit[$scope.fieldA] = a.toUpperCase();
                if($scope.fieldB!=undefined)
                $scope.edit[$scope.fieldB] = b.toUpperCase();
                console.log('toPush=',$scope.edit);
                var count=0;

                if($scope.oldData!=undefined && $scope.oldData.length>0) {
                    console.log('hey');
                    angular.forEach($scope.oldData, function (value, i) {
                        if (value[$scope.fieldA] == a.toUpperCase() || value==a.toUpperCase()) return ++count;
                    });
                }

                if(count==0) {
                    $scope.data = $filter('filter')($scope.data, function (value, id) {
                        return (value[$scope.fieldA] != $scope.edit[$scope.fieldA]);
                    });

                    $scope.valueData = $filter('filter')($scope.valueData, function (value, id) {
                        return (value != $scope.edit[$scope.fieldA]);
                    });

                    $scope.data.push(angular.copy($scope.edit));
                    $scope.valueData.push(angular.copy(a.toUpperCase()));
                    //console.log('disData=',$scope.data);
                    $scope.edit = {};
                }else{
                    Alert.error({message:'This Already Exist in Saved Data.',header:''});
                }
            };

            /**
             * This is used to delete from tag both with and without id
             * @param index
             * @param id
             */
            $scope.deleteTagged=function (index) {

                $scope.data=$filter('filter')($scope.data,function (value,i) {
                    return(i!=index);
                });

                $scope.valueData=$filter('filter')($scope.valueData,function (value,i) {
                    return(i!=index);
                });
            };
        }],
        templateUrl :"views/shared/tagList.html"
    };
});