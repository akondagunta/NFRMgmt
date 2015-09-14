angular.module('ConMonApp').controller('loadBulkNFRsFormCtrl', function ($scope, $http, $modalInstance) {  

  $scope.ok = function () {
    $modalInstance.close();
  };
 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
