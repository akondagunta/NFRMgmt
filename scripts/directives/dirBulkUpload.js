angular.module('ConMonApp')
.directive('autoGrow', function() {
    return function(scope, element, attr) {
      var minHeight = element[0].offsetHeight,
        paddingLeft = element.css('paddingLeft'),
        paddingRight = element.css('paddingRight');
 
      var $shadow = angular.element('<div></div>').css({
        position: 'absolute',
        top: -10000,
        left: -10000,
        width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
        fontSize: element.css('fontSize'),
        fontFamily: element.css('fontFamily'),
        lineHeight: element.css('lineHeight'),
        resize: 'none'
      });
      angular.element(document.body).append($shadow);
 
      var update = function() {
        var times = function(string, number) {
          for (var i = 0, r = ''; i < number; i++) {
            r += string;
          }
          return r;
        }
 
        var val = element.val().replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/&/g, '&amp;')
          .replace(/\n$/, '<br/>&nbsp;')
          .replace(/\n/g, '<br/>')
          .replace(/\s{2,}/g, function(space) {
            return times('&nbsp;', space.length - 1) + ' '
          });
        $shadow.html(val);
 
        element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */ , minHeight) + 'px');
      }
 
      element.bind('keyup keydown keypress change', update);
      update();
    }
  })
 
angular 
    .module('ConMonApp')
    .directive('chooseFileButton', function() {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        var button = elem.find('button');
        var input = elem.find('input');
        input.css({
          display: 'none'
        });
        button.bind('click', function() {
          input[0].click();
 
        });
      }
    };
  })
 
angular
.module('ConMonApp')
.directive('fileDrop', function($parse) {
    return {
      restrict: 'A',
      scope: {
        drop: '&'
      },
      link: function(scope, elm, attrs) {
 
 
        var el = elm[0];
        el.addEventListener(
          'dragover',
          function(e) {
            e.dataTransfer.dropEffect = 'move';
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false
          }, false)
        el.addEventListener(
          'dragenter',
          function(e) {
            this.classList.add('over');
            return false;
          }, false)
        el.addEventListener(
          'dragLeave',
          function(e) {
            this.classList.remove('over')
            return false;
          }, false)
        el.addEventListener(
          'drop',
          function(e) {
            if (e.stopPropagation) e.stopPropagation();
            e.preventDefault()
            this.classList.remove('over')
            var files = e.dataTransfer.files
 
            function applyDrop() {
              scope.drop({
                excel: files[0]
              })
            }
 
            scope.$apply(applyDrop())
 
            return false;
          }, false)
      }
    }
  })
 
angular
   .module('ConMonApp')
   .directive('fileInput', function($parse) {
    return {
      restrict: 'A',
      scope: {
        passin: '&'
      },
      link: function(scope, elm, attrs) {
 
        elm.bind('change', function() {
          console.log('In file input')
            // console.log(elm[0].files[0])
          var files = elm[0].files[0]
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files[0])
          var applyInput = function(){
            scope.passin({
              excel: files
            })
          }  
          scope.$apply(applyInput())
        })
      }
 
    }
 
  })
angular
    .module('ConMonApp')
    .directive('setCell', function() {
    return {
      restrict: 'E',
      scope: {
        setdata: '=',
        setcolumns: '='
 
      },
      link: function(scope, elm, attrs) {
        scope.$watch('displayResults', function(newval) {
 
          if (newval) {
            console.log("updated display results", newval)
            scope.displayResults = newval
          }
 
        })
      },
      templateUrl: '/appdev/NFRMgmt.dev/views/directives/dirTableView.html',
 
      controller: function($scope) {
        $scope.selected = {
          chosen: false
        }
        $scope.gridData = {}
        
        
        $scope.displayResults = $scope.setdata ? [].concat($scope.setdata) : 0
        $scope.columnkeys = _.keys($scope.setcolumns)
        $scope.columnlength = $scope.columnkeys.length
        $scope.delete = function(index){
          
          
          var pulled = _.pullAt($scope.setdata,index)
          $scope.gridData.deleted = true
          console.log("Grid data",$scope.gridData)
        }
        
        $scope.edit = function($event, ths) {
         
          var stopIfDelete = $scope.gridData.deleted ? true : false
          console.log(stopIfDelete)
          if(stopIfDelete){
            
            return $scope.gridData = {}
          }
          var row = _.values(ths.data)
         
         /*
         Capturing cell event with Angular's jQuery lite. 
         Handling edits in a grid like fashion versus editing entire row. 
         
         */
          var scope = angular.element($event.target).scope()
          /*
              Because lodash is already in use throughout this feature
              I choose to use it to get the coordinates of X and Y values
              versus passing this information through $index Angular service, 
              which I had issues with given that I am using nested NGRepeats.
              The _.values gets the row values as an array, _.indexOf gets the array element#. 
          */
          var rowIndex = _.indexOf(row,scope.cell)
         
         /*
             This is a parent object that can be referenced by the child objects in the scope.
             This is the mechanism I am using within the view model to control updates to each cell. 
         */
          angular.extend($scope.gridData, {
            cellName: scope.cell,
            selected: true,
            rowId: ths.$index,
            colId: rowIndex,
            deleted: null
          })
          
          
          console.log("scope griddata",$scope.gridData)
 
 
        }
        $scope.update = function(data, cell, ix) {
 
        /*
           Update gets the updated value from the user, data represents the row the user is updating pre-update,
           and ix is the angular $index for the row. 
           
           Lodash does a ETL-like thing here where I'm iterating over the objects, finding the row that matches
           the row user is editing with _.isEqual deep matching operation, returning that index, create an array of 
        */
          _.chain($scope.setdata).forEach(function(n, key) {
 
            if (_.isEqual(n, data)) {
              index = key;
              return;
            }
          }).value()
            
          var rowDataTransformedAsArrayOfItems = _.keys(data)
          console.log('keys rowDataTransformedAsArrayOfItems',rowDataTransformedAsArrayOfItems,ix)
          var keypair = rowDataTransformedAsArrayOfItems[ix]
          data[keypair] = cell
          $scope.setdata.splice(index, 1, data)
 
          $scope.gridData = {}
 
 
        }
        $scope.exit = function(){
          $scope.gridData = {}
        }
 
 
      }
    }
  })