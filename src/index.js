'use strict';

function Kids (array) {
  this.a = [];
  this.total = 0;
  this.girls = 0;
  this.boys = 0;
  this.ratio = 0;

  var randomGender = function () {
    return Math.random() > 0.5 ? 'F' : 'M';
  };
  var demoList = function (n) {
    var array = [];
    for (var i = 0; i < n; i += 1) {
      array.push({id: i, name: i, gender: randomGender()});
    }
    return array;
  };
  var countGirls = function (array) {
    return array.reduce(function (p, c) {
      return c.gender === 'F' ? p + 1 : p;
    }, 0);
  };
  var ratio = function (girls, total) {
    return girls * 100 / total;
  };

  this.update = function (array) {
    this.a = array;
    this.total = this.a.length;
    this.girls = countGirls(array);
    this.boys = this.total - this.girls;
    this.ratio = ratio(this.girls, this.total);
  };

  this.update(array === undefined ? demoList(35) : array);

  this.debug = function () {
    return {
      a: this.a,
      total: this.total,
      girsl: this.girls,
      boys: this.boys,
      ratio: this.ratio
    };
  };
}

function Freq (n) {
  this.a = [];

  var init = function (n) {
    var a = [];
    for (var i = 0; i < n; i += 1) {
      a[i] = [];
      for (var j = 0; j < n; j += 1) {
        a[i].push(0);
      }
    }
    return a;
  };

  this.a = init(n);

  this.update = function (kida, kidb) {
    this.a[kida][kidb] += 1;
  };
  this.getFreq = function (kida, kidb) {
    return this.a[kida][kidb] + this.a[kidb][kida];
  };
  this.debug = function () {
    return this.a;
  };
}
