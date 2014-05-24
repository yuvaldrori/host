'use strict';

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
//events
var events = 0;

var genRandomSex = function () {
  if (Math.random() > 0.5) {
    return 'F';
  } else {
    return 'M';
  }
};

var initTestGroup = function () {
  while (kids.length) {
    kids.pop();
  }
  for (var i = 0; i < 35; i += 1) {
    kids.push({name: i, sex: genRandomSex()});
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
  }, 0)
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

var initResults = function () {
  while (results.length) {
    results.pop();
  }
  var groups = Math.floor(kids.length / nKidsInGroup);
  for (var i = 0; i < events; i += 0) {
    results.push([]);
    for (var j = 0; j < groups; j += 1) {
      results[i].push([]);
    }
  }
};
