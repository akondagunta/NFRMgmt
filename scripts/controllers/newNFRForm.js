angular.module('ConMonApp').controller('NewNFRFormCtrl', function ($scope, $http, $modalInstance, systems, controls, controlCategorys, assessmentTypes, fiscalYearOptions) {  

  $scope.systems = systems;
  $scope.controls = controls;
  $scope.controlcategorys = controlCategorys;
  $scope.assessmenttypes = assessmentTypes;
  $scope.fiscalYearOptions = fiscalYearOptions;
  $scope.FormDigestValue = "";

  $scope.ok = function () {
    // Make a POST request to SP2013 to get the REQUESTDIGEST value:
/*    $http({
	method: 'POST',
	url: "https://iconline.coe.ic.gov/sites/DIA-CIO3/C/1/SP_SQL_Team" + "/_api/contextinfo"
    }).then(function(data) { 
	// alert(data);
	xmlDoc = $.parseXML( data.data );
	$xml = $( xmlDoc );
	$scope.FormDigestValue = data.data.substr(data.data.indexOf("<d:FormDigestValue>") + 19, (data.data.indexOf("</d:FormDigestValue>") - (data.data.indexOf("d:FormDigestValue") + 18)));

	// $scope.FormDigestValue = data.getElementsByTagName("d:FormDigestValue")[0];
    }).catch(function(data,status) { 
	//alert(error);
	console.error('Error getting the REQUESTDIGEST value', status, data); 
    }).finally(function() {
	// TO DO: 
	console.log("Finally finished getting the REQUESTDIGEST value");
    });

    // TO DO: add new item to the sharepoint list
    $http({
	method: 'POST',
	url: "https://iconline.coe.ic.gov/sites/DIA-CIO3/C/1/SP_SQL_Team" + "/_api/web/lists/getbytitle('" + "ITNFRManagementTest" + "')/items",
	data: {NFRNumber: $scope.newItem.NFRNumber, FiscalYearValue: $scope.newItem.FiscalYearValue, System: $scope.newItem.System},
	headers: {"Accept": "application/json;odata=verbose", 
		  "X-RequestDigest": $scope.FormDigestValue
		}
    }).then(function(data) { 
	// alert(data);
	$scope.newItem = data;
    }).catch(function(data,status) { 
	//alert(error);
	console.error('New NFR Item submit error', status, data); 
    }).finally(function() {
	// TO DO: 
	console.log("Finally finished New NFR Item submit");
    });
*/

    // add new item to the sharepoint list using old SP2010 REST API:
    $http({
	method: 'POST',
	url: "https://iconline.coe.ic.gov/sites/DIA-CIO3/C/1/SP_SQL_Team" + "/_vti_bin/listdata.svc/ITNFRManagementTest",
	data: {NFRNumber: $scope.newItem.NFRNumber, NFRTitle: $scope.newItem.NFRTitle, FiscalYearValue: $scope.newItem.FiscalYearValue, System: $scope.newItem.System, Control: $scope.newItem.Control, ControlCategoryValue: $scope.newItem.ControlCategory, AssessmentTypeValue: $scope.newItem.AssessmentType, AssessmentDate: $scope.newItem.AssessmentDate, NFRCondition: $scope.newItem.NFRCondition, NFRCriteria: $scope.newItem.NFRCriteria, NFRCause: $scope.newItem.NFRCause, NFREffect: $scope.newItem.NFREffect, NFRRecommendation: $scope.newItem.NFRRecommendation},
	headers: {"Accept": "application/json;odata=verbose", 
		  "X-RequestDigest": $scope.FormDigestValue
		}
    }).then(function(data) { 
	// alert(data);
	$scope.newItem = data.data.d;
    }).catch(function(data,status) { 
	//alert(error);
	console.error('New NFR Item submit error', status, data); 
    }).finally(function() {
	// TO DO: 
	$modalInstance.close($scope.newItem);
	console.log("Finally finished New NFR Item submit");
    });


  };
 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
