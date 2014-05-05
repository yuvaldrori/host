'use strict';

var HOST = function () {

  //frequency of kids in the same group
  var freq = [];
  //array of kid with name and gender
  var kids = [];
  //how many kids in a group
  var nKidsInGroup = 0;
  //true - group shuffling, false - change hosts in single group
  var shuffle = true;
  //results written here
  var results = [];

  var isGirl = function (index) {
    return true;
  };

  var initFreqArray = function () {
    var nKids = kids.length;
    for (var i = 0; i < nKids; i += 1) {
      freq[i] = [];
      for (var j = 0; j < nKids; j += 1) {
        freq[i].push(0);
      }
    }
  };

  var test = function () {
    initFreqArray();
    return freq;
  };

  return {
    test: test
  };

}();

console.log(HOST.test);
