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

}
