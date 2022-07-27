(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)

      
  //NarrowItDownController.$inject = ['MenuSearchService'];
  // Service MenuSearchService  
  function MenuSearchService() {
    this.getMatchedMenuItems = function() {
      // return $http("https://davids-restaurant.herokuapp.com/menu_items.json")
      // .then(function (result) {
        console.log('veio')
      // });
    }
  }
  

  NarrowItDownController.$inject = ['MenuSearchService'];
  NarrowItDownController.$inject = ['$scope'];
  // Controller NarrowItDownController
  function NarrowItDownController($scope, MenuSearchService) {
    console.log(MenuSearchService, $scope)
   $scope.foundItems = [];
    
   $scope.teste = function() {
      console.log("veio")
    //   var shoppingList = new MenuSearchService();
    //   console.log(shoppingList)
    }
  }
}
)()
