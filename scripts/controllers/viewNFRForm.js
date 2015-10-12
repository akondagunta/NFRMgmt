angular.module('ConMonApp').controller('ViewNFRFormCtrl', function ($scope, $http, $modalInstance, item, systems, systemTypes, controls, controlCategorys, assessmentTypes, fiscalYearOptions, statusTypes) {  
  
  $scope.newItem = item;

  $scope.systems = systems;
  $scope.systemTypes = systemTypes;
  $scope.statusTypes = statusTypes;
  $scope.controls = controls;
  $scope.controlcategorys = controlCategorys;
  $scope.assessmenttypes = assessmentTypes;
  $scope.fiscalYearOptions = fiscalYearOptions;
 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
