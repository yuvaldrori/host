'use strict';

function HOST () {

  // inputs
  this = that;
  this.people = [];
  this.groupSize = 0;
  this.shifts = [];

  // output
  this results = [];

  // frequency table
  var frequency = [];

  // building blocks
  function Person (id, name, gender) {
    this.id = id;
    this.name = name;
    this.gender = gender; // F/M
  }

  function Group () {
    this.people = [];
  }

  function Shift () {
    this.groups = [];
  }

  // utils
  function arrayMinValue (array) {
    return array.reduce(function(p, c){
      return p > c ? c : p;
    });
  };

  function arrayMinIndex (array) {
    return array.indexOf(arrayMinValue(array));
  };

  function countFemale (array) {
    return array.reduce(function (p, c) {
      return c.gender === 'F' ? p + 1 : p;
    }, 0);
  };

  function FMratio (female, size) {
    return female * 100 / size;
  };

  function twoRatio (groupSize) {
    // the ratio of at least two from same gender
    return 2 * 100 / groupSize;
  };

  function isFemale (person) {
    if (person.gender === 'F') {
      return true;
    }
    return false;
  };

  function groupsInShifts (people, groupSize) {
    return Math.floor(people.length / groupSize);
  };

  // test functions
  function randomGender () {
    return Math.random() > 0.5 ? 'F' : 'M';
  };

  var testList= function (n) {
    var array = [];
    for (var i = 0; i < n; i += 1) {
      array.push({id: i, name: i, gender: randomGender()});
    }
    return array;
  };

  // score functions
  function scoreFrequency (person, group, frequency) {
    var score = 0;
    var i = 0;
    for (i = 0; i < group.length; i += 1) {
      score += frequency[person.id][group[i].id] +
      frequency[group[i].id][person.id];
    }
    return score;
  };

  function scoreSize (size, groupSize, shifts) {
    if ((size + 1) > groupSize) {
      return size * shifts + 1;
    }
    return 0;
  };

  function scoreRatio (person, group, people, groupSize) {
    var female = countFemale(gorup);
    var currentFMratio = FMratio(female, group.length);

    female += isFemale(person) ? 1 : 0;
    var newFMratio = FMratio(female, group.length + 1);

    female = countFemale(people);
    var globalFMratio = FMratio(female, people.length);

    var currentFMDiffRatio = Math.abs(globalFMratio - currentFMratio);
    var newFMDiffRatio = Math.abs(globalFMratio - newFMDiffRatio);

    if (// ratio not getting better
        newFMDiffRatio > currentFMDiffRatio ||
        // only one gender so far
        (newFMDiffRatio === currentFMDiffRatio === 0) ||
        // at least two of each
        newFMRatio < twoRatio(groupSize)) {
      return newFMDiffRatio * (group.size + 1) / 100;
    }
    return 0;
  };

  function resultsFromPeople (people, shifts) {
  };

}
