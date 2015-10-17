angular.module('ConMonApp').controller('loadBulkNFRsFormCtrl', function ($scope, $http, $modalInstance,XLSXReaderService) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

 $scope.showTable = {
      showing: false
    };
    $scope.showPreview = true;
    $scope.files = null;
    $scope.dropFile = function(file) {

      $scope.files = file;

      return showPreviewChanged();
    };
    $scope.editRow = function(row) {
      $scope.rowSelected = {};
      for (var prop in row) {
        console.log("Row!!2", prop);
        $scope.rowSelected[prop] = row[prop];
      }
      console.log("prop ", $scope.rowSelected);
      console.log("Row!!1 ", row.Name);
        //$scope.Row = {Name: row[0]};
    };

    function showPreviewChanged(file) {

      $scope.showTable.showing = true;
      console.log("scope files", $scope.files);
        //When I drop the excel file I set a variable
        // When uploading a file is passed into the function.
      var excelFile = $scope.files ? $scope.files : file;
      console.log(excelFile);
      XLSXReaderService.readFile(excelFile, $scope.showPreview)
        .then(function(xlsxData) {


          var data = xlsxData.sheets.Sheet1.data;




          function excelConvert(data) {
            return data.slice(1).map(function(xs) {
              return xs.reduce(function(acc, x, i) {
                acc[data[0][i]] = x;
                return acc;
              }, {});
            });
          }
          var results = excelConvert(data);
          var objColumn = data.shift();

          $scope.col = objColumn;

          $scope.results = results;
          $scope.displayResults = [].concat($scope.results);
        });


    }


});
