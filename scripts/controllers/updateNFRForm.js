angular.module('ConMonApp').controller('UpdateNFRFormCtrl', function ($scope, $http, $modalInstance, item, systems, systemTypes, controls, controlCategorys, assessmentTypes, fiscalYearOptions, statusTypes) {  
  
  $scope.newItem = item;

  $scope.systems = systems;
  $scope.systemTypes = systemTypes;
  $scope.statusTypes = statusTypes;
  $scope.controls = controls;
  $scope.controlcategorys = controlCategorys;
  $scope.assessmenttypes = assessmentTypes;
  $scope.fiscalYearOptions = fiscalYearOptions;

  $scope.ok = function () {
    $http({
         method: 'POST',
         url: item.__metadata.uri,
         contentType: 'application/json',
         processData: false,
         headers: {
                "Accept": "application/json;odata=verbose",
                "X-HTTP-Method": "MERGE",
                "If-Match": "*"
                // "If-Match": item.__metadata.etag
         },
	 data: {NFRNumber: $scope.newItem.NFRNumber, NFRTitle: $scope.newItem.NFRTitle, FiscalYearValue: $scope.newItem.FiscalYearValue, System: $scope.newItem.System, Control: $scope.newItem.Control, ControlCategoryValue: $scope.newItem.ControlCategoryValue, AssessmentTypeValue: $scope.newItem.AssessmentTypeValue, AssessmentDate: $scope.newItem.AssessmentDate, NFRCondition: $scope.newItem.NFRCondition, NFRCriteria: $scope.newItem.NFRCriteria, NFRCause: $scope.newItem.NFRCause, NFREffect: $scope.newItem.NFREffect, NFRRecommendation: $scope.newItem.NFRRecommendation, NFROwner: $scope.newItem.NFROwner, SystemOwnerValue: $scope.newItem.SystemOwnerValue, NFROPR: $scope.newItem.NFROPR, NFRStatusValue: $scope.newItem.NFRStatusValue},
         // data: {NFRNumber: $scope.newItem.NFRNumber, FiscalYearValue: $scope.newItem.FiscalYearValue, System: $scope.newItem.System, Control: $scope.newItem.Control, Finding: $scope.newItem.Finding, Remediation: $scope.newItem.Remediation},
         success: function (data) {
                // success(data);
         },
         error: function (data) {
                failure(data);
         }
      }).then(function(data) { 
	// alert(data);
	// $scope.newItem = data.data.d;
    }).catch(function(data,status) { 
	//alert(error);
	console.error('Update NFR Item submit error', status, data); 
    }).finally(function() {
	// TO DO: 
	$modalInstance.close($scope.newItem);
	console.log("Finally finished Update NFR Item submit");
    });
  };
 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
