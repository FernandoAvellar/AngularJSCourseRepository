(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

 ToBuyController.$inject = ['ShoppingListCheckOffService'];
 function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.newItemName = "";
  buyList.newItemQuantity = "";

  buyList.items = ShoppingListCheckOffService.getBuyList();

  buyList.boughtButton = function (itemIndex) {
    ShoppingListCheckOffService.changeItemFromBuyListToBoughtList(itemIndex);
  };

  buyList.deleteButton = function (itemIndex) {
    ShoppingListCheckOffService.deleteItemFromBuyList(itemIndex);
  };

  buyList.addButton = function () {
    ShoppingListCheckOffService.addToBuyList(buyList.newItemName, buyList.newItemQuantity);
  };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtList();

  }

 function ShoppingListCheckOffService() {
  var service = this;

  var buyListItems = 
  [ { itemName : "bolacha maizena", itemQuantity : "10 pacotes" },
    { itemName : "presunto", itemQuantity : "300 gramas" },
    { itemName : "café", itemQuantity : "2 pacotes" },
    { itemName : "sorvete", itemQuantity : "1 pote" },
    { itemName : "pizza congelada", itemQuantity : "3 unidades" } ];

  var boughtListItems = [];

  service.getBuyList = function () {
    return buyListItems;
  };

  service.getBoughtList = function () {
    return boughtListItems;
  };

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
        itemName : newItemName,
        itemQuantity : newItemQuantity
      };

    buyListItems.push(newItem);
  }

}

})();
