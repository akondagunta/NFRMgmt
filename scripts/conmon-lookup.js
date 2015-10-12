var app = angular.module('ConMonApp', ['chart.js', 'ui.bootstrap','smart-table']);

app.controller('ConMonAppCtrl', function ($scope, $modal, $log, $http, $filter) {

  // collapse CAP Info:
  $scope.isCollapsed = true;

  // Alerts for the ConMon app actions
  $scope.alerts = [];

  $scope.addAlert = function(type, msg) {
    $scope.alerts.push({type: type, msg: msg});
  };
 
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  // paging for the NFR Items:
  $scope.numPerPage = 5;
  $scope.currentPage = 1;
  $scope.pageChanged = function() {
    if($scope.lookupResults) {
	$scope.lookupResultsPageData = $scope.lookupResults.slice( (($scope.currentPage - 1) * $scope.numPerPage), ($scope.currentPage * $scope.numPerPage));
    }
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  function updatePager() {
    $scope.totalItems = $scope.lookupResults.length;
    $scope.pageChanged();
  }

  init();

  // initialize all the $scope variables
  function init() {  
	$scope.fiscalYearOptions = ['FY2013', 'FY2014', 'FY2015', 'FY2016'];

	$scope.focusAreas = ["Business Process", "Information System", "Both"];

	$scope.systems = ['iRMIS', 'Web-Based Translator', 'iRMIS DRTS', 'iRMIS-FL CivPay', 'iRMIS-FL Spend Plan', 'CMS', 'EDW', 'eZHR', 'DJSIG', 'HSC', 'NE SCI Corp Lan', 'NIPRNet', 'Security Management', 'SIPRNET', 'DACAFM', 'DLWS', 'S-PBUSE', 'ILS', 'ILS and PASS', 'PASS', 'Physical Security'];

	$scope.controls = ['Security Management', 'Access Controls', 'Configuration Management', 'Segregation of Duties', 'Contingency Planning', 'Business Process Controls', 'Interfaces', 'Data management Systems'];

	$scope.controlCategorys = ['AS','AD','IT', 'FIN'];

	$scope.systemTypes = ["DIA", "Non-DIA"];

	$scope.statusTypes = ["Open", "Closed", "Hold"];

	$scope.assessmentTypes = ['Financial Statement Audit','Internal FISCAM Assessment','FISMA'];

	resetSearshStrings();
  }

  function resetSearshStrings() {
	$scope.searchFocusString = "Choose Focus Area";
	$scope.searchSystemString = "Choose System";
	$scope.searchControlString = "Choose Control";
  }

  initChart();

  function initChart() {
	$scope.chartlabels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.chartseries = ['System A', 'System B'];
	$scope.chartoptions = {responsive:true, maintainAspectRatio:true};

	$scope.chartdata = [
	    [65, 59, 85, 81, 56, 55, 40],
	    [28, 48, 45, 19, 86, 27, 90]
	];

	$scope.chartOnClick = function (points, evt) {
	  console.log(points, evt);
	};

	$scope.chart2labels = $scope.controls;
	$scope.chart2data = [300, 500, 100, 40, 120, 200, 100, 75];
	$scope.chart2type = 'Pie';
  
	$scope.chart2toggle = function () {
		$scope.chart2type = $scope.chart2type === 'PolarArea' ? 'Pie' : 'PolarArea';
	};
	$scope.showHideCharts = 'true';
  }

  $scope.updateSearchFocusString = function(focusArea) {
	$scope.searchFocusString = focusArea;
    };

  $scope.updateSearchSystemString = function(system) {
	$scope.searchSystemString = system;
    };

  $scope.updateSearchControlString = function(control) {
	$scope.searchControlString = control;
    };

  $scope.openNewNFRForm = function() {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/newNFRForm.html',
		controller: 'NewNFRFormCtrl',
		size: 'lg',
		resolve: {
        		systems: function () {
          			return $scope.systems;
        		},
			controls: function () {
          			return $scope.controls;
        		},
			fiscalYearOptions: function () {
          			return $scope.fiscalYearOptions;
        		},
			controlCategorys: function () {
          			return $scope.controlCategorys;
        		},
			assessmentTypes: function () {
          			return $scope.assessmentTypes;
        		},
			systemTypes: function () {
          			return $scope.systemTypes;
        		},
			statusTypes: function () {
          			return $scope.statusTypes;
        		}
      		}

	});
 
	modalInstance.result.then(function (item) {
		$scope.fullResultSet.push(item);
		updatePager();
		$scope.addAlert('success',('Success! New NFR added with NFR Number: '+item.NFRNumber));
	}, function () {
		$log.info('New NFR Modal dismissed at: ' + new Date());
	});
  };


  $scope.updateNFR = function(item) {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/updateNFRForm.html',
		controller: 'UpdateNFRFormCtrl',
		size: 'lg',
		resolve: {
        		item: function () {
          			return item;
        		},
        		systems: function () {
          			return $scope.systems;
        		},
			controls: function () {
          			return $scope.controls;
        		},
			fiscalYearOptions: function () {
          			return $scope.fiscalYearOptions;
        		},
			controlCategorys: function () {
          			return $scope.controlCategorys;
        		},
			assessmentTypes: function () {
          			return $scope.assessmentTypes;
        		},
			systemTypes: function () {
          			return $scope.systemTypes;
        		},
			statusTypes: function () {
          			return $scope.statusTypes;
        		}
      		}

	});
 
	modalInstance.result.then(function (updatedItem) {
		item = updatedItem;
		$scope.addAlert('success',('Success! NFR updated with NFR Number: '+item.NFRNumber));
		// $scope.alerts.push({ type: 'success', msg: 'Success! NFR updated with NFR Number: '+item.NFRNumber  });
		}, function () {
		$log.info('Update NFR Modal dismissed at: ' + new Date());
	});
  };

  $scope.viewNFR = function(item) {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/viewNFRForm.html',
		controller: 'ViewNFRFormCtrl',
		size: 'lg',
		resolve: {
        		item: function () {
          			return item;
        		},
        		systems: function () {
          			return $scope.systems;
        		},
			controls: function () {
          			return $scope.controls;
        		},
			fiscalYearOptions: function () {
          			return $scope.fiscalYearOptions;
        		},
			controlCategorys: function () {
          			return $scope.controlCategorys;
        		},
			assessmentTypes: function () {
          			return $scope.assessmentTypes;
        		},
			systemTypes: function () {
          			return $scope.systemTypes;
        		},
			statusTypes: function () {
          			return $scope.statusTypes;
        		}
      		}

	});
 
	modalInstance.result.then(function () {
		}, function () {
		$log.info('View NFR Modal dismissed at: ' + new Date());
	});
  };

  $scope.deleteNFR = function(item) {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/deleteNFRForm.html',
		controller: 'DeleteNFRFormCtrl',
		size: 'lg',
		resolve: {
        		item: function () {
          			return item;
        		}
      		}
	});
 
	modalInstance.result.then(function (item) {
		// alert(functiontofindIndexByKeyValue($scope.fullResultSet,'NFRNumber',item.NFRNumber));
		$scope.addAlert('success',('Success! NFR deleted with NFR Number: '+item.NFRNumber));
		$scope.fullResultSet.splice(functiontofindIndexByKeyValue($scope.fullResultSet,'NFRNumber',item.NFRNumber),1);
		updatePager();
	}, function () {
		$log.info('Delete NFR Modal dismissed at: ' + new Date());
	});



  };

  $scope.uploadBulkNFRs = function() {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/loadBulkNFRsForm.html',
		controller: 'loadBulkNFRsFormCtrl',
		size: 'lg'
	});
 
	modalInstance.result.then(function () {
		
	}, function () {
		$log.info('Bulk upload NFRs Modal dismissed at: ' + new Date());
	});

  };

  $scope.showAnalytics = function() {
	var modalInstance = $modal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/showAnalytics.html',
		controller: 'showAnalyticsCtrl',
		size: 'lg',
		resolve: {
			controls: function () {
          			return $scope.controls;
        		}
      		}
	});
 
	modalInstance.result.then(function () {
		
	}, function () {
		$log.info('Real-time Analytics Modal dismissed at: ' + new Date());
	});

  };

  $http({ url: "https://3fectasolutions.sharepoint.com" + "/_vti_bin/listdata.svc/NFRItems",  
                method: "GET",  
            	headers: { "Accept": "application/json;odata=verbose" }  
        }).success(function (data) //got the result successfully  
        {  
            var dataResults = data.d.results; // List Items 
	    $scope.lookupResults = dataResults;
            $scope.fullResultSet = dataResults;  
	    $scope.lookupResultsFound = true;

	    updatePager();

        })  
        .error(function (data, status, headers, config) // got the error  
	{     
        	alert("error"); //ToDo:Display proper error message/Stack Trace/ Status Code  
	});
    
  $scope.getLookupResults = function () {
    if($scope.searchSystemString != "Choose System" || $scope.searchControlString != "Choose Control") {
      // TODO: ADD code to filter $scope.lookupResults
      var filtered = [];
      for (var i = 0; i < $scope.fullResultSet.length; i++) {
        var item = $scope.fullResultSet[i];
        if(($scope.searchSystemString != "Choose System") && ($scope.searchControlString != "Choose Control")) {
		if (item.System && item.System.localeCompare($scope.searchSystemString) == 0 && item.Control && item.Control.localeCompare($scope.searchControlString) == 0) {
        	  filtered.push(item);
        	}
        } else if ($scope.searchSystemString != "Choose System") {
	        if (item.System && item.System.localeCompare($scope.searchSystemString) == 0) {
        	  filtered.push(item);
        	}
        } else {
	        if (item.Control && item.Control.localeCompare($scope.searchControlString) == 0) {
        	  filtered.push(item);
        	}
        }
      }
      $scope.lookupResults = filtered;
      $scope.pageChanged();

      $scope.totalItems = $scope.lookupResults.length;

      resetSearshStrings();
    }
  };

  $scope.resetLookupResults = function () {
       $scope.lookupResults = $scope.fullResultSet;  
       updatePager();
  };    


  // Utility function to get array index
  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) { 
	for (var i = 0; i < arraytosearch.length; i++) { 
		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
  }

});






