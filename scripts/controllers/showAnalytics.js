angular.module('ConMonApp').controller('showAnalyticsCtrl', function ($scope, $http, $modalInstance, controls) {  

  $scope.controls = controls;

  $scope.ok = function () {
    $modalInstance.close();
  };
 
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
  }


});
