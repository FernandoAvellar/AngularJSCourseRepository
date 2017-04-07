(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

 ToBuyController.$inject = ['ShoppingListCheckOffService'];
 function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyList();

  buyList.boughtButton = function (itemIndex) {
    ShoppingListCheckOffService.changeItemFromBuyListToBoughtList(itemIndex);
  };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtList();

  }

 function ShoppingListCheckOffService() {
  var service = this;

  var buyListItems = [ 
   {
    itemName : "Cookies",
    itemQuantity : "10"
   },
   {
    itemName : "Sandwiches",
    itemQuantity : "30" 
   },
   {
    itemName : "Cake",
    itemQuantity : "1" 
   },
   {
    itemName : "Ice Creams",
    itemQuantity : "5" 
   },
   {
    itemName : "Pizzas",
    itemQuantity : "22" 
   },
   {
    itemName : "Coffees",
    itemQuantity : "13" 
   }
  ];

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
    console.log(buyListItems);
    console.log(buyListItems.length);
  };

}

})();
