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

  this.update = function (kida, kids) {
    var a = [];
    a = kids instanceof Array ? kids : a.push(kids);
    for (var i = 0; i < a.length; i += 1) {
      this.a[kida.id][kids[i].id] += 1;
    }
  };
  this.getFreq = function (kida, kids) {
    var score = 0;
    var a = [];
    a = kids instanceof Array ? kids : a.push(kids);
    for (var i = 0; i < a.length; i += 1) {
      score += this.a[kida.id][a[i].id] + this.a[a[i].id][kida.id];
    }
    return score;
  };
  this.debug = function () {
    return this.a;
  };
}

function Event (size) {
  this.a = [];
  this.total = 0;
  this.girls = 0;
  this.boys = 0;
  this.ratio = 0;
  this.size = size;

  this.update = function (kid, freq) {
    this.a.push(kid);
    freq.update(kid, this.a);
    this.total = this.a.length;
    this.girls = countGirls(this.a);
    this.boys = this.total - this.girls;
    this.ratio = ratio (this.girls, this.total);
  };
  this.score = function (kid, week, freq) {
    var score = 0;
    for (var i = 0; i < this.a.length; i += 1) {
      if (kid === this.a[i]) {
        return Number.MAX_VALUE;
      }
    }
    score += freq.getFreq (kid, this.a);
    if ((this.total + 1) > this.size) {
      score += (this.size - 1) * week;
    }
    return score;
  };
}

function Results (weeks, groupSize) {
  var a = [];
  var s = [];
  var kids = new Kids();
  var freq = new Freq(kids.total);
  var groups = Math.floor(kids.total / groupSize);
  var events = groups * weeks;
  var i, g, k;
  var lv, idx;
  var score = 0;
  //init results with hosts
  for (i = 0; i < events; i += 1) {
    a.push(new Event(groupSize));
    a[i].update(kids.a[i < kids.total ? i : i - kids.total], freq);
  }
  //
  for (i = 0; i < weeks; i += 1){
    assignkid:
    for (k = 0; k < kids.total; k += 1) {
      s = [];
      for (g = 0 + i * groups; g < (groups + i * groups); g += 1) {
        score = a[g].score(kids.a[k], i + 1, freq);
        if (score == Number.MAX_VALUE) {
          continue assignkid;
        } else {
          s.push(score);
        }
      }
      lv = s.reduce(function(p, c){
        return p > c ? c : p;
      });
      idx = s.indexOf(lv);
      a[i * groups + idx].update(kids.a[k], freq);
    }
  }
  return a;
}
