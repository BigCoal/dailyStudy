(function anonymous(name, age, _callback) {
  "use strict";
  var _context;
  var _x = this._x;

  var _counter = 2;  // 
  var _done = (function () {
    _callback();
  });

  var _fn0 = _x[0];
  _fn0(name, age, (function () {
    if (--_counter === 0) _done();
  }));

})