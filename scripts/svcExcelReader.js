
(function(undefined) {
    // Get angular app
    var app = angular.module("ConMonApp");
 
    app.factory("XLSXReaderService", ['$q', '$rootScope', '$timeout',
        function($q, $rootScope, $timeout) {
            
            var service = function(data) {
               
                angular.extend(this, data);
            };
            
            
            service.readFile = function(file, showPreview) {
                var deferred = $q.defer();
                console.log(showPreview)
                XLSXReader(file, showPreview, false,function(data){
                  
                  $rootScope.$apply(function(){
                    deferred.resolve(data)
                  })
                  
                });
 
                return deferred.promise;
                
               
                
            };
            return service;
        }
    ]);
}).call(this);
