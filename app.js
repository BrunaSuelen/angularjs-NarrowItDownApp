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

      console.log(items);
      return items;
    }
  }
  


  // FoundItemsDirective
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: { 
        found: '<',
        onRemove: "&"
      },
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

    scope.$watch('list.getFound()', 
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
    var list = this;

    list.removeItem = function(itemIndex) {
      console.log("'this' is: ", this);
      console.log(itemIndex);
      // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      // shoppingList.removeItem(itemIndex);
      // this.title = origTitle + " (" + viewList.items.length + " items )";
    };

    list.getFound = function() {
      console.log(list)
      return list.found?.length;
    }
  }



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
