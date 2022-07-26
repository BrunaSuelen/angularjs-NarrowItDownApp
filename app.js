(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownAppController', NarrowItDownAppController)
  //  .service('MenuSearchService', MenuSearchService)

  // Controller NarrowItDownAppController
  NarrowItDownAppController.$inject = ['$scope'];

  function NarrowItDownAppController($scope) {
    this.foundItems = [];

    $scope.search = function() {
      console.log("veio")
       NarrowItDownAppController.getMatchedMenuItems(searchTerm)
    }
  }

  // Service MenuSearchService
  
  function MenuSearchService() {
    this.getMatchedMenuItems = function (searchTerm) {
      return $http("https://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function (result) {
          console.log(result)
        });
    }
  }
}
)()
