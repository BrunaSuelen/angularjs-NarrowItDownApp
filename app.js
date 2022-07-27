(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)

      
  // Service MenuSearchService  
  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    this.getMatchedMenuItems = function() {
      return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function(result) {
          if (result.status == 200) {
            console.log(result.data.menu_items)
            return result.data.menu_items;
          }

          return null;
        });
    }
  }
  

  // Controller NarrowItDownController
  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  
  function NarrowItDownController($scope, MenuSearchService) {
    $scope.found = [];
    
    $scope.teste = function() {
      $scope.found = MenuSearchService.getMatchedMenuItems()
      console.log($scope.found)
    }
  }
}
)()
