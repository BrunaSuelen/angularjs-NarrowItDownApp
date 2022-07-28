(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .factory('NarrowItDownFactory', NarrowItDownFactory)
    .directive('foundItems', FoundItemsDirective)
    .directive('loading', LoadingDirective)

      
  // Service MenuSearchService
  function MenuSearchService($http) {
    let service = this;
    let foundItems = [];
    service.loading = false;

    service.getMatchedMenuItems = function(term) {
      service.loading = true;

      return $http
        .get("http://davids-restaurant.herokuapp.com/menu_items.json")
        .then(function(result) {
          if (result.status == 200) {
            foundItems = result.data.menu_items;
            service.loading = false;
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

      return foundItems = items;
    }

    service.removeItem = function(itemIndex) {
      return foundItems.splice(itemIndex, 1);
    };
  }
  


  // FoundItemsDirective
  function LoadingDirective() {
    return { templateUrl: './components/itemsloaderindicator.html' };
  }



  // FoundItemsDirective
  function FoundItemsDirective() {
    return {
      templateUrl: './components/foundItems.html',
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
    scope.$watch('foundItems.getFoundItens()',
      function (newValue, oldValue) {
        if (newValue) {
          controller.setFoundItens(newValue);
        }
      }
    );
  }

  function FoundItemsDirectiveController() {
    var foundItems = this;

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
    return function() {
      return new MenuSearchService($http);
    };
  }



  // Controller NarrowItDownController
  NarrowItDownController.$inject = [ '$scope', 'NarrowItDownFactory' ];

  function NarrowItDownController($scope, NarrowItDownFactory) {
    $scope.found;
    $scope.term = '';
    $scope.service = NarrowItDownFactory();

    $scope.teste = function() {
      $scope.found = [];

      if ($scope.term) {
        $scope.found = $scope.service.getMatchedMenuItems($scope.term);
      }
    }

    $scope.showMessageNothingFound = function() {
      let found = $scope.found;
      let loading = $scope.service.loading;
      let foundList = found && found.$$state?.value;

      return !loading && ((foundList && foundList.length == 0) || (!$scope.term && found));
    }

    $scope.removeItem = function(index) {
      $scope.service.removeItem(index);
    }
  }
}
)()
