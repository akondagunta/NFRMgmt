angular.module('ConMonApp').controller('DeleteNFRFormCtrl', function ($scope, $http, $modalInstance, item) {  

  $scope.ok = function () {
    $http({
         method: 'POST',
         url: item.__metadata.uri,
         headers: {
                "Accept": "application/json;odata=verbose",
                "X-HTTP-Method": "DELETE",
                "If-Match": "*"
         },
         success: function (data) {
                // success(data);
         },
         error: function (data) {
                failure(data);
         }
      });

    $modalInstance.close(item);
  };
 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
