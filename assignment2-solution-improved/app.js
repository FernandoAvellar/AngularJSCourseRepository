(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .controller('NewItemController', NewItemController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ////////////////////////////////////////////////////////////////////////////
  // ToBuy Controller  //
  ////////////////////////////////////////////////////////////////////////////
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {

    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getBuyList();

    buyList.boughtButton = function (itemIndex) {
      ShoppingListCheckOffService.changeItemFromBuyListToBoughtList(itemIndex);
    };

    buyList.deleteButton = function (itemIndex) {
      ShoppingListCheckOffService.deleteItemFromBuyList(itemIndex);
    };

    buyList.editButton = function (itemIndex) {
      ShoppingListCheckOffService.returnSelectedItemToNewItemInput(itemIndex);
    };

  }

  ////////////////////////////////////////////////////////////////////////////
  // AlreadyBought Controller  //
  ////////////////////////////////////////////////////////////////////////////
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtList();

    boughtList.returnToBuyListButton = function (itemIndex) {
      ShoppingListCheckOffService.returnSelectedItemToBuyList(itemIndex);
    };

  }

  ////////////////////////////////////////////////////////////////////////////
  // NewItem Controller //
  ////////////////////////////////////////////////////////////////////////////
  NewItemController.$inject = ['ShoppingListCheckOffService', '$rootScope'];
  function NewItemController(ShoppingListCheckOffService, $rootScope) {
    var newItem = this;

    refreshInputFields();

    newItem.addButton = function () {
      ShoppingListCheckOffService.addToBuyList(newItem.newItemName, newItem.newItemQuantity);
      clearNewItemView();
    };

    $rootScope.$on('refreshInputFields', function () {
      refreshInputFields();
    });

    function clearNewItemView() {
      newItem.newItemName = "";
      newItem.newItemQuantity = "";
    };

    function refreshInputFields() {
      newItem.newItemName = ShoppingListCheckOffService.getNewItemContent().itemName;
      newItem.newItemQuantity = ShoppingListCheckOffService.getNewItemContent().itemQuantity;
    };

  }


  ////////////////////////////////////////////////////////////////////////////
  // Service ShoppingListCheckOffService//
  ////////////////////////////////////////////////////////////////////////////
  function ShoppingListCheckOffService($rootScope) {
    var service = this;

    var buyListItems =
      [{ itemName: "bolacha maizena", itemQuantity: "10 pacotes" },
      { itemName: "presunto", itemQuantity: "300 gramas" },
      { itemName: "cafe", itemQuantity: "2 pacotes" },
      { itemName: "sorvete", itemQuantity: "1 pote" },
      { itemName: "pizza congelada", itemQuantity: "3 caixas" }];

    var boughtListItems = [];

    var newItemContent = { itemName: "", itemQuantity: "" };

    service.getBuyList = function () {
      return buyListItems;
    };

    service.getBoughtList = function () {
      return boughtListItems;
    };

    service.getNewItemContent = function () {
      return newItemContent;
    }

    service.changeItemFromBuyListToBoughtList = function (itemIndex) {
      var removedItem = buyListItems.splice(itemIndex, 1);
      boughtListItems.push(removedItem[0]);
    };

    service.deleteItemFromBuyList = function (itemIndex) {
      buyListItems.splice(itemIndex, 1);
    }

    service.addToBuyList = function (newItemName, newItemQuantity) {
      var newItem =
        {
          itemName: newItemName,
          itemQuantity: newItemQuantity
        };
      buyListItems.push(newItem);
    }

    service.returnSelectedItemToNewItemInput = function (itemIndex) {
      var editItem = buyListItems.splice(itemIndex, 1)[0];
      newItemContent = { itemName: editItem.itemName, itemQuantity: editItem.itemQuantity };
      $rootScope.$broadcast('refreshInputFields');
    }

    service.returnSelectedItemToBuyList = function (itemIndex) {
      var returnedItem = boughtListItems.splice(itemIndex, 1);
      buyListItems.push(returnedItem[0]);
    }

  }

})();
