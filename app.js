(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)

      
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
  


  // FoundItemsDirective
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: { found: '<' },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };

    return ddo;
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);

    scope.$watch('list.cookiesInList()', 
      function (newValue, oldValue) {
        console.log("Old value: ", oldValue);
        console.log("New value: ", newValue);

        // if (newValue === true) {
        //   displayCookieWarning();
        // }
        // else {
        //   removeCookieWarning();
        // }

      }
    );

    // function displayCookieWarning() {
    //   // Using Angluar jqLite
    //   // var warningElem = element.find("div");
    //   // console.log(warningElem);
    //   // warningElem.css('display', 'block');

    //   // If jQuery included before Angluar
    //   var warningElem = element.find("div.error");
    //   warningElem.slideDown(900);
    // }


    // function removeCookieWarning() {
    //   // Using Angluar jqLite
    //   // var warningElem = element.find("div");
    //   // warningElem.css('display', 'none');

    //   // If jQuery included before Angluar
    //   var warningElem = element.find("div.error");
    //   warningElem.slideUp(900);
    // }
  }

  function FoundItemsDirectiveController() {
    
  }



  // Controller NarrowItDownController
  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

  function NarrowItDownController($scope, MenuSearchService) {
    $scope.found = [];
    
    $scope.teste = function() {
      $scope.found = MenuSearchService.getMatchedMenuItems();
      console.log($scope.found)
    }
  }
}
)()
