(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .controller('NewItemController', NewItemController)
 .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

 ////////////////////////////////////////////////////////////////////////////
 // ToBuyController  //
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
  // AlreadyBoughtController  //
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
 // NewItemController //
 ////////////////////////////////////////////////////////////////////////////
  NewItemController.$inject = ['ShoppingListCheckOffService'];
  function NewItemController(ShoppingListCheckOffService) {
    var newItem = this;

    newItem.newItemName = ShoppingListCheckOffService.getNewItemContent().itemName;
    newItem.newItemQuantity = ShoppingListCheckOffService.getNewItemContent().itemQuantity;

    newItem.addButton = function () {
    ShoppingListCheckOffService.addToBuyList(newItem.newItemName, newItem.newItemQuantity);
      clearNewItemView();
    };

    function clearNewItemView() {
      newItem.newItemName = "";
      newItem.newItemQuantity = "";
    };
  }


  ////////////////////////////////////////////////////////////////////////////
  // Service ShoppingListCheckOffService//
  ////////////////////////////////////////////////////////////////////////////
 function ShoppingListCheckOffService() {
  var service = this;

  var buyListItems =
  [ { itemName : "bolacha maizena", itemQuantity : "10 pacotes" },
    { itemName : "presunto", itemQuantity : "300 gramas" },
    { itemName : "café", itemQuantity : "2 pacotes" },
    { itemName : "sorvete", itemQuantity : "1 pote" },
    { itemName : "pizza congelada", itemQuantity : "3 caixas" } ];

  var boughtListItems = [];

  var newItemContent = {itemName : "", itemQuantity: ""};

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
        itemName : newItemName,
        itemQuantity : newItemQuantity
      };
    buyListItems.push(newItem);
  }

  service.returnSelectedItemToNewItemInput = function (itemIndex) {
    var editItem = buyListItems.splice(itemIndex, 1)[0];
    newItemContent = {itemName : editItem.itemName, itemQuantity: editItem.itemQuantity};
    console.log(newItemContent);
  }

  service.returnSelectedItemToBuyList = function (itemIndex) {
    var returnedItem = boughtListItems.splice(itemIndex, 1);
    buyListItems.push(returnedItem[0]);
  }

}

})();
