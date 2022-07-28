(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .service('MenuSearchService', MenuSearchService)
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItemsDirective)
    .directive('loading', LoadingDirective)

      
  // Service MenuSearchService
  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    let service = this;
    let foundItems = [];
    service.loading = false;

    service.getMatchedMenuItems = function(term) {
      service.loading = true;

      return $http
        .get("//davids-restaurant.herokuapp.com/menu_items.json")
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



  // Controller NarrowItDownController
  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
    let controller = this;
    controller.found;
    controller.term = '';
    controller.service = MenuSearchService;

    controller.search = function() {
      controller.found = [];

      if (controller.term) {
        controller.found = controller.service.getMatchedMenuItems(controller.term);
      }
    }

    controller.showMessageNothingFound = function() {
      let found = controller.found;
      let loading = controller.service.loading;
      let foundList = found && found.$$state?.value;

      return !loading && ((foundList && foundList.length == 0) || (!controller.term && found));
    }

    controller.removeItem = function(index) {
      controller.service.removeItem(index);
    }
  }
}
)()
