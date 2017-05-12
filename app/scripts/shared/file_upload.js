
/**
 * Created by Kazeem Olanipekun Babatunde on 09/11/2016.
 * Email: kezyolanipekun@gmail.com
 * Phone: 08135061846
 */
'use strict';
var app = angular.module('fileUploadModule', ['AlertModule','ApiHandlerModule']);
app.directive("fileUploader", function() {
  return {
    restrict : "E",
    replace:true,
    scope : {
      fileAllowed:'=',
      inputRequired:'=',
      uploadUrl:'=',
      previewId:'=?',
      onClickAction:'&'
    },
    controller:'fileUploadCtrl',
    templateUrl :"views/shared/file_upload.html"
  };
});

/**
 *
 * File upload controller
 */
app.controller('fileUploadCtrl', ['$scope','AlertService','ApiHandler','$timeout',
    function ($scope,Alert,ApiHandler,$timeout) {
        var file=undefined;
        var encodeImage=undefined;
        var params={};

        /**
         *
         * read the selected file to render it to the view so the user can
         * see when the file has changed it is more intuitive that way
         * @param input
         */
      var readURL=  function(input) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    encodeImage=e.target.result;
                    //console.log('myE=>',e);
                    if($scope.previewId!=undefined)
                    $('#'+$scope.previewId).show().attr('src', e.target.result);
                };
                reader.readAsDataURL(input);
        };

        /**
         *
         * Event to handle behaviour once file is selected for upload
         * This is better than using a scoped approach
         */
        $("#fileUpload").change(function(){
            file  = document.getElementById('fileUpload').files[0];
            //console.log(file);
           var confirm = window.confirm('Are you sure of the '+$scope.fileAllowed+' you selected?');
            if(confirm == true)
            {
                if($scope.fileAllowed.toLowerCase()=="image" && file!=undefined && (file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg" || file.type=="image/gif")) {
                    readURL(file);
                }else if( $scope.fileAllowed.toLowerCase()=="image" && file!=undefined && (file.type!="image/png" || file.type!="image/jpg" || file.type!="image/jpeg" || file.type!="image/gif") ){
                    alert("File extension doesn't match image file, Please select an image file.");
                    $("#fileUpload").val('');
                }
            }
        });

        /**
         *
         * Listen for upload event
         */
        $scope.$on('file_upload', function (event, data) {
            params=data;
            uploadFile();
        });

        /**
         * This is used to store the file
         * @param file
         */
        var storeData = function (file) {
            if (file==undefined && $scope.inputRequired==false) {
                $scope.onClickAction({params:undefined});
            }else if(($scope.inputRequired==true || $scope.inputRequired==false) && file!=undefined) {
                var fd=new FormData();
                fd.append('file',file);
                angular.forEach(params,function (value,index) {
                    fd.append(index,value);
                });
                ApiHandler.callService('POST',$scope.uploadUrl, fd).then(function (resp) {
                    console.log('resp=',resp);
                    try{
                        console.log('resp1=',resp);
                        if(resp.data.status==200) {
                            resp.data.encodeImage=encodeImage;
                            Alert.success({message: 'File uploaded successfully', header: ''});
                            $scope.onClickAction({params: resp});
                        }else{
                           // Alert.error({message: resp.data.message, header: ''});
                            $scope.onClickAction({params: resp});
                        }
                    }
                    catch(e){
                       // Alert.error({message: resp.data.message, header: ''});
                       $scope.onClickAction({params: resp});
                    }
                }, function (e) {
                    Alert.error({
                        message: 'Unexpected error occured while processing file upload , file upload ignored.',
                        header: ''
                    });
                    $scope.onClickAction({params:undefined});
                });
            }else{
                Alert.error({message: 'File not selected, file upload ignored.', header: ''});
                $scope.onClickAction({params: undefined});
            }
        };



      /**
       * This function is used to upload the actual image to the cloud no real need for scopes
       */
   var uploadFile= function () {
          if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
              Alert.error({message:"The File APIs are not fully supported in this browser, file upload ignored.",header:'Upload'});
              $scope.onClickAction({params: undefined, bucketIds: undefined});
              return;
          }
          if($scope.fileAllowed.toLowerCase()=="file"  && file!=undefined) {
              storeData(file);
          }else if($scope.fileAllowed.toLowerCase()=="image" && file!=undefined && (file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg" || file.type=="image/gif")) {
              storeData(file);
          }else{
              storeData(file);
          }
      };
}]);
