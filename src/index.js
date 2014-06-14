'use strict';

var arrayMinValue = function (array) {
  return array.reduce(function(p, c){
    return p > c ? c : p;
  });
};

var arrayMinIndex= function (array) {
  return array.indexOf(arrayMinValue(array));
};

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

var isF = function (kid) {
  if (kid.gender === 'F') {
    return true;
  }
  return false;
}

var scoreFreq = function (kida, kids, freq) {
  return freq.getFreq (kida, kids);
};

var scoreSize = function (total, size, round) {
  if ((total + 1) > size) {
    return (size - 1) * round;
  }
  return 0;
};

var scoreRatio = function (
    kida, girls, total,
    globalRatio, currentRatio) {
  var newRatio = ratio(isF(kida) ? girls + 1 : girls, total + 1);
  var currentDiffRatio = Math.abs(globalRatio - currentRatio);
  var newDiffRatio = Math.abs(globalRatio - newRatio);
  if (newDiffRatio > currentDiffRatio) {
    return newDiffRatio * (total + 1) / 100;
  }
  return 0;
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
}

function Freq (n) {
  this.a = [];

  this.init = function (n) {
    var a = [];
    for (var i = 0; i < n; i += 1) {
      a[i] = [];
      for (var j = 0; j < n; j += 1) {
        a[i].push(0);
      }
    }
    return a;
  };

  this.a = this.init(n);

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
}

function Event (size) {
  var that = this;
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

  function has (kida) {
    if (that.a.filter(function (element) {
      return kida === element;
    }).length > 0) {
      return true;
    }
    return false;
  }

  this.score = function (kid, week, gratio, freq) {
    if (has(kid)) {
      return Number.MAX_VALUE;
    }

    var score = 0;

    score += scoreFreq (kid, this.a, freq);
    score += scoreSize (this.total, this.size, week);
    score += scoreRatio (kid, this.girls, this.total,
        gratio, this.ratio);

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
        score = a[g].score(kids.a[k], i + 1, kids.ratio, freq);
        if (score == Number.MAX_VALUE) {
          continue assignkid;
        } else {
          s.push(score);
        }
      }
      a[i * groups + arrayMinIndex(s)].update(kids.a[k], freq);
    }
  }
  return {a:a, kids:kids, freq: freq};
}
