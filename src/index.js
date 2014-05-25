'use strict';

//frequency of kids in the same group
var freq = [];
//array of kid with name and gender
var kids = [];
//how many kids in a group
var kidsInGroup = 0;
//true - group shuffling, false - change hosts in single group
var shuffle = true;
//results written here
var results = [];
//events
var events = 0;
var groups = 0;
var mod = 0;

var genRandomSex = function () {
  if (Math.random() > 0.5) {
    return 'F';
  } else {
    return 'M';
  }
};

var initTestGroup = function (n) {
  while (kids.length) {
    kids.pop();
  }
  for (var i = 0; i < n; i += 1) {
    kids.push({id: i, name: i, sex: genRandomSex()});
  }
};

var isGirl = function (index) {
  if (kids[index].sex === 'F') {
    return true;
  } else {
    return false;
  }
};

var girls = function () {
  return kids.reduce(function(p, c) {
    if (c.sex === 'F') {
      return p + 1;
    } else {
      return p;
    }
  }, 0);
};

var boys = function () {
  return kids.length - girls();
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

var initResultsWithHosts = function () {
  while (results.length) {
    results.pop();
  }
  var index = 0;
  groups = Math.floor(kids.length / kidsInGroup);
  for (var i = 0; i < events; i += 1) {
    results.push([]);
    for (var j = 0; j < groups; j += 1) {
      results[i].push([kids[index]]);
      index += 1;
      if (index === kids.length) {
        index = 0;
      }
    }
  }
};

var updateFreq = function (kidIndex, groupIdx) {
  for (var i = 0; i < results[groupIdx].length; i += 1) {
    freq[kidIndex][results[groupIdx][i].id] += 1;
  }
};
