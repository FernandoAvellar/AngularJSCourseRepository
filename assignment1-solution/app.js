(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
  $scope.input = "";
  $scope.output = "";

  $scope.updateOutput = function () {
    var outputMessage = getValidationMessage();
    $scope.output = outputMessage;
  };

  function getValidationMessage() {
    var input = $scope.input;
    var splittedInput = input.split([`,`]);
    var resultMessage = "";
    var inputIsEmpty = false;

    if(splittedInput.length == 1){
      inputIsEmpty = checkIfInputIsEmpty(splittedInput);
    }

    if(splittedInput.length <= 3 && !inputIsEmpty) {
      resultMessage = "Enjoy!"
    }
    else {
      resultMessage = "Please enter data first!"
    }

    if(splittedInput.length > 3) {
      resultMessage = "Too much!"
    }

    return resultMessage;
  }

  function checkIfInputIsEmpty(string) {
        if(string[0] == "") {
          return true;
        }
    return false;
  }
  
};

})();
