'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaultConfig = {
  moveCallbacks: false,
  resistance: 0
};

var Swipe = /*#__PURE__*/function () {
  function Swipe() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Swipe);

    _defineProperty(this, "handleTouchStart", function (e) {
      var _e$touches = _slicedToArray(e.touches, 1),
          firstTouch = _e$touches[0];

      _this.xDown = firstTouch.clientX;
      _this.yDown = firstTouch.clientY;
      _this.swipeEvent.touchStart = e;
    });

    _defineProperty(this, "handleTouchMove", function (e) {
      if (!_this.xDown || !_this.yDown) return;
      _this.swipeEvent.touchMove = e;
      var xUp = e.touches[0].clientX;
      var yUp = e.touches[0].clientY;
      var xDiff = _this.xDown - xUp;
      var yDiff = _this.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > _this.options.resistance) {
          _this.chooseEventCallback('moveleft', 'swipeleft');
        } else if (xDiff < _this.options.resistance * -1) {
          _this.chooseEventCallback('moveright', 'swiperight');
        }
      } else if (yDiff > _this.options.resistance) {
        _this.chooseEventCallback('moveup', 'swipeup');
      } else if (yDiff < _this.options.resistance * -1) {
        _this.chooseEventCallback('movedown', 'swipedown');
      }

      if (_this.options.moveCallbacks) {
        _this.xDown = xUp;
        _this.yDown = yUp;
      }
    });

    _defineProperty(this, "handleTouchEnd", function (e) {
      _this.swipeEvent.touchEnd = e;

      _this.triggerCallback(_this.event);

      _this.xDown = null;
      _this.yDown = null;
    });

    this.options = _objectSpread2(_objectSpread2({}, defaultConfig), options);
    this.target = target;
    this.callbacks = [];
    this.swipeEvent = {};
    this.event = '';
    this.xDown = null;
    this.yDown = null;
  }

  _createClass(Swipe, [{
    key: "hasCallback",
    value: function hasCallback() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return !!this.callbacks.find(function (_ref) {
        var e = _ref.event;
        return e === event;
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.addListeners();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeListeners();
      this.callbacks = [];
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      this.target.addEventListener('touchstart', this.handleTouchStart);
      this.target.addEventListener('touchmove', this.handleTouchMove);
      this.target.addEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: "removeListeners",
    value: function removeListeners() {
      this.target.removeEventListener('touchstart', this.handleTouchStart);
      this.target.removeEventListener('touchmove', this.handleTouchMove);
      this.target.removeEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: "chooseEventCallback",
    value: function chooseEventCallback() {
      var _this2 = this;

      var optionalEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var defaultEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (this.options.moveCallbacks && this.hasCallback(optionalEvent)) {
        this.event = optionalEvent;
        this.triggerCallback(optionalEvent);
        setTimeout(function () {
          _this2.event = defaultEvent;
        });
      } else {
        this.event = defaultEvent;
      }
    }
  }, {
    key: "triggerCallback",
    value: function triggerCallback() {
      var _this3 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var currentCallbacks = this.callbacks.filter(function (_ref2) {
        var e = _ref2.event;
        return e === event;
      });
      currentCallbacks.forEach(function (_ref3) {
        var callback = _ref3.callback;
        return callback();
      });
      setTimeout(function () {
        _this3.event = '';
      });
    }
  }, {
    key: "on",
    value: function on() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.callbacks.push({
        event: event,
        callback: callback
      });
      return this;
    }
  }, {
    key: "off",
    value: function off() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.callbacks = this.callbacks.filter(function (_ref4) {
        var c = _ref4.callback,
            e = _ref4.event;
        return !(callback === c && event === e);
      });
    }
  }]);

  return Swipe;
}();

var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
var field = document.querySelector('.page__body');
var footerText = document.querySelector('.page__footer p');

var printText = function printText(str) {
  return footerText.textContent = str;
};

printText("Touch events are ".concat(isTouch ? 'enabled' : 'disabled'));
var swipe = new Swipe(field);
swipe.init();

function up() {
  printText('Swipe up');
}

swipe.on('swipeup', up).on('swipedown', function () {
  printText('Swipe down');
}).on('swipeleft', function () {
  printText('Swipe left');
}).on('swiperight', function () {
  printText('Swipe right');
}).on('moveup', function () {
  printText('Move up');
}).on('movedown', function () {
  printText('Move down');
}).on('moveleft', function () {
  printText('Move left');
}).on('moveright', function () {
  printText('Move right');
});
