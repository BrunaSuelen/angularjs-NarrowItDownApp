(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .factory('NarrowItDownFactory', NarrowItDownFactory)
    .directive('foundItems', FoundItemsDirective)

      
  // Service MenuSearchService
  function MenuSearchService($http) {
    let service = this;
    let foundItems = [];

    service.getMatchedMenuItems = function(term) {
      return $http
        .get("https://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function(result) {
          if (result.status == 200) {
            foundItems = result.data.menu_items;
            return service.findItensByTerm(term);
          }

          return null;
        });
    }

    service.findItensByTerm = function(term) {
      let items = [];
      let length = foundItems.length;

      for (let i=0; i < length; i++) {
        let item = foundItems[i];
        let description = item.description.toUpperCase();
        let termUpper = term ? term.toUpperCase() : '';

        if (description.indexOf(termUpper) !== -1) {
          items.push(item);
        }
      }

      return items;
    }
  }
  


  // FoundItemsDirective
  function FoundItemsDirective() {
    return {
      templateUrl: 'foundItems.html',
      scope: { 
        found: '<',
        onRemove: "&"
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);
    console.log("attrs is: ", attrs);

    scope.$watch('foundItems.getFoundItens()',
      function (newValue, oldValue) {
        if (newValue) {
          controller.setFoundItens(newValue)
        }
      }
    );
  }

  function FoundItemsDirectiveController() {
    var foundItems = this;

    foundItems.removeItem = function(itemIndex) {
      console.log("'this' is: ", this);
      console.log(itemIndex);
      // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      // shoppingList.removeItem(itemIndex);
      // this.title = origTitle + " (" + viewList.items.length + " items )";
    };

    foundItems.getFoundItens = function() {
      let items = foundItems.found;

      if (items && items.$$state?.value) {
        return items?.$$state?.value;
      }
    }

    foundItems.setFoundItens = function(items) {
      foundItems.found = items;
    }
  }



  // Factory NarrowItDownFactory
  NarrowItDownFactory.$inject = ['$http'];
  
  function NarrowItDownFactory($http) {
    var factory = function() {
      return new MenuSearchService($http);
    };

    return factory;
  }



  // Controller NarrowItDownController
  NarrowItDownController.$inject = [ '$scope', 'NarrowItDownFactory' ];

  function NarrowItDownController($scope, NarrowItDownFactory) {
    $scope.found = [];
    $scope.term = '';
    let service = NarrowItDownFactory();

    $scope.teste = function() {
      console.log($scope.term)
      $scope.found = service.getMatchedMenuItems($scope.term);
    }
  }
}
)()
