'use strict';

/* Controllers */


var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('MainCtrl',['$scope','Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
  }]);



phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope,$filter, Phone) {

    var $parentScope = $scope.$parent;
    $scope.phones = $parentScope.phones;

    $scope.remove = function(item) { 
	  $scope.phones.splice($scope.phones.indexOf(item),1);   
	}   
	
    $scope.search = function(query){
      var name = angular.lowercase(query.name);
      var number = angular.lowercase((query.price).toString());
      return (name.indexOf($scope.query || '') !== -1 || number.indexOf($scope.query || '') !== -1 );
    }
}]);



phonecatApp.controller('OrderingController',['$scope',function($scope){
  //set the parent controller model as you modify in child's 
  var $parentScope = $scope.$parent;
  $parentScope.orderProp = $scope.orderProp ='name';
  $parentScope.reverse = $scope.reverse = false;
   $scope.order = function(orderProp) {
      $scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false; 
      $parentScope.orderProp = $scope.orderProp = orderProp;
      $parentScope.reverse=$scope.reverse;
   };
}]);
