'use strict';

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

function Kids (array) {
  this.a = [];
  this.total = 0;
  this.girls = 0;
  this.boys = 0;
  this.ratio = 0;

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
  this.getFreq = function (kida, kids) {
    var score = 0;
    var a = [];
    a = kids instanceof Array ? kids : a.push(kids);
    for (var i = 0; i < a.length; i += 1) {
      if (kida === kids[i]) {
        score = Number.MAX_VALUE;
      } else {
        score += this.a[kida][a[i]] + this.a[a[i]][kida];
      }
    }
    return score;
  };
  this.debug = function () {
    return this.a;
  };
}

function Event () {
  this.a = [];
  this.total = 0;
  this.girls = 0;
  this.boys = 0;
  this.ratio = 0;

  this.update = function (kid) {
    this.a.push(kid);
    this.total = this.a.length;
    this.girls = countGirls(this.a);
    this.boys = this.total = this.girls;
    this.ration = ratio (this.girls, this.total);
  };
  this.score = function (kid, freq) {
    return freq.getFreq (kid, freq);
  };
}

function Results (weeks, groupSize) {
  var a = [];
  var s = [];
  var kids = new Kids();
  var freq = new Freq(kids.total);
  var groups = Math.floor(kids.total / groupSize);
  var events = groups * weeks;
  var i, g, k, m, t;
  //init results with hosts
  for (i = 0; i < events; i += 1) {
    a.push(new Event());
    a[i].update(kids[i < kids.total ? i : i - kids.total]);
  }
  //
  for (i = 0; i < weeks; i += 1){
    for (k = 0; k < kids.total; k += 1) {
      s = [];
      for (g = 0 + i * g; g < (groups + i * g); g += 1) {
        s.push(a[g].score(kids[k], freq));
      }
      t = 0;
      for (m = 0; m < s.length; m += 1) {
        t = t < s[m] ? t : m;
      }
      a[i * g + t].update(kids[k]);
    }
  }
}
