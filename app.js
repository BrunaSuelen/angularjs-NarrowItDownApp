(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)

      
  MenuSearchService.$inject = ['$http'];
  // Service MenuSearchService  
  function MenuSearchService($http) {
    this.getMatchedMenuItems = function() {
      return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function(result) {
          if (result.status == 200) {
            console.log(result.data.menu_items)
            return result.data.menu_items;
          }
        });
    }
  }
  

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  // Controller NarrowItDownController
  function NarrowItDownController($scope, MenuSearchService) {
   $scope.foundItems = [];
    
   $scope.teste = function() {
      console.log("veio")
     console.log(MenuSearchService.getMatchedMenuItems())
    }
  }
}
)()
