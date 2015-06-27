'use strict';

/* Directives */


phonecatControllers.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = $scope.$parent.phones;
  $scope.animationsEnabled = true;

  $scope.close = function(results){
    console.log(results);
  }

  $scope.open = function (size,phone) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'AddModalInstanceCtrl',
      size: size,
      // backdrop:'static',
      // keyboard:false,
      resolve: {
        prodList: function () {
         return $scope.items;
        },
        phoneData: function() {
          return phone;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
     $scope.finalProdArray = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
});


phonecatControllers.controller('AddModalInstanceCtrl', function ($scope, $modalInstance, prodList, phoneData) {
  $scope.data = {
        SKUID: prodList.length, 
        id: "Give it an id", 
        imageUrl: "img/phones/motorola-charm-with-motoblur.0.jpg", 
        rating : 3,
        price : 15000,
        stock : 150,
        name: "Your Product's Name", 
        snippet: " How awesome your product is... "
  }
  $scope.prodInfo = phoneData;

  $scope.ok = function () {
   // if(phoneData!=='undefined'){this.update()}

    var data = $scope.prodInfo;
    
    if(phoneData===undefined && data!==undefined && ((data.name && data.id && data.price) !== undefined)){
       angular.extend($scope.data,data)
      //push into prodList
      prodList.push($scope.data);
   //retrun prodList;
    }else if(phoneData!==undefined){}else{
      //give an alert
      return;
    }
    //close the modal
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


//Alert boxed
phonecatControllers.controller('AlertDemoCtrl', function ($scope) {
  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});