/**
 * Created by Theophilus  on 11/7/2016 and modified by Kazeem Olanipekun<kezyolanipekun@mail.com>.
 * Theophilus Omoregbee <theo4u@ymail.com>
 */
angular.module('paginatorModule', [])


/**
 * This is used to paginate table information based on the
 * data{array} passed to it
 * the copy{array|[]} is returned to the user to iterate through on instead of the original data
 * limit{int|50} is used to specify which limit, default is 50 record per page
 * async{boolean|false} let our directive know that the record is coming asynchronously
 * total {int|data.length} is used along side async, so we know how many record we are expecting from our source. Default it is the length of data
 * asyncMethod helps to manage the function to be called when asyn is true, so we finish the record from ur source
 *
 * this directive listen to 'record-changed' so we can update our directive too
 * so we can either $scope.$broadcast with the data+new-data to the event broad casted from user
 *
 * and
 *
 * 'record-reset' so we can rest the current pagination to another form if the parent data changes entirely to another
 * data record
 *
 * add ui bootstrap for fine tooltip (optional though)
 *
 */
    .directive("paginator", function () {
    return {
        restrict:'E',
        scope: {
            data:'=',
            copy:'=',
            limit:'=?',
            currentPage: '=?',
            async: '=?',
            total: '=?',
            asyncMethod: '&'
        },
        templateUrl: "views/shared/paginator.html",
        controller: ["$scope", "$filter", function ($scope, $filter){

            $scope.limit = $scope.limit || 50; //default
            $scope.currentPage = $scope.currentPage || {}; //default
            $scope.pages = [];
            $scope.navigators = {prev: {state: false}, next: {state: false}};
            $scope.async = $scope.async || false;
            $scope.total = $scope.total || $scope.data.length;//take data length
            var current_page=undefined;
            var index=undefined;
            /**
             * watch for any change in limit from the user passing the limit
             */
            $scope.$watch('limit', function() {
                $scope.reset();//reset the our directive
                $scope.paginate();
            });

            /**
             * watch if the original data has changed and update
             * our pagination with the new data here
             */
            $scope.$on('record-changed', function (event, data) {
                if(data !== undefined) {
                    $scope.data = data;
                    $scope.paginate();
                }
                else {
                    //console.error("data is undefined, please pass data is not undefined, for pagination to work");
                }
            });


            /**
             * this only update the current pagination to none , so pagination can do its calculation to the first page
             */
            $scope.$on('record-reset', function (event, data) {
                //set current page to {} to reset the pagination
                $scope.reset();
            });


            /**
             * calculate the number of pages for us and
             * then set the first one as our active page
             */
            $scope.paginate = function(){
                $scope.pages = [];//clear it here resetting
                var n = Math.ceil($scope.data.length / $scope.limit);
                for(var i=0; i<n; i++)
                    $scope.pages.push({start:(i*$scope.limit), page:i+1, active:false});

                if ($scope.data.length > 0) {
                    //set the first or the current page number to active one
                    var current = $scope.currentPage.page === undefined ? 1 : $scope.currentPage.page;
                    $scope.setPageActive(current);
                }
            };

            /**
             * this helps to set the wanted page number to be active
             */
            $scope.setPageActive = function(page){
                index = page-1;
                var n =   $scope.pages.length;
                var previous_page = 1;
                for(var i=0; i<n; i++){
                    if($scope.pages[i].active)
                        current_page = $scope.pages[i].page;

                    $scope.pages[i].active = i == index;
                }

                //do calculation of next page offseting here
                //var limit = $scope.pages[index].start+$scope.limit;

                //keep it there so we dont mess with the original record
                $scope.copy = angular.copy($scope.data);
                //slice dont add the limit so we add up, so we ignore the last one
                $scope.copy = $scope.copy.splice($scope.pages[index].start,$scope.limit);

                //update our current page variable now
                $scope.currentPage = $scope.pages[index];

                $scope.navigators["next"].state =  index < (n - 1);
                $scope.navigators["prev"].state =  index > 0;
            };

            /**
             * this is triggered when the user hit on the prev button
             * this only works when the navigators.prev.state is true
             */
            $scope.prev = function(){
                if($scope.navigators.prev.state){
                    $scope.setPageActive($scope.getCurrentPage()-1);
                }
            };

            /**
             * this is triggered when the user hit on the next button
             * this only works when the navigators.next.state is true
             */
            $scope.next = function(){
                if($scope.navigators.next.state){
                    $scope.setPageActive($scope.getCurrentPage()+1);
                }
            };

            /**
             * this returns the current active page
             */
            $scope.getCurrentPage = function (){
                for(var i=0;i<$scope.pages.length; i++)
                    if($scope.pages[i].active)
                        return i+1;
            };


            /**
             * This resets our directive when information of any such occur
             * like
             * limit
             * data
             */
            $scope.reset = function(){
                //set current page to {} to reset the pagination
                $scope.currentPage = {};
                $scope.copy = [];
            };

            $scope.paginate();


        }]

    }
});