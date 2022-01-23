// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"myo.js":[function(require,module,exports) {
/**
 * Copyright 2015 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  var Socket,
      myoList = {};

  if (typeof window !== 'undefined') {
    if (!("WebSocket" in window)) throw "MYO: Websockets are not supported by your browser :(";
    Socket = WebSocket;
  }

  var Myo = {
    defaults: {
      api_version: 3,
      socket_url: "ws://127.0.0.1:10138/myo/",
      app_id: 'com.myojs.default'
    },
    lockingPolicy: 'standard',
    events: [],
    myos: [],
    onError: function onError() {
      throw 'MYO: Error with the socket connection. Myo Connect might not be running. If it is, double check the API version.';
    },
    setLockingPolicy: function setLockingPolicy(policy) {
      Myo.socket.send(JSON.stringify(['command', {
        "command": "set_locking_policy",
        "type": policy
      }]));
      Myo.lockingPolicy = policy;
      return Myo;
    },
    trigger: function trigger(eventName) {
      var args = Array.prototype.slice.apply(arguments).slice(1);
      emitter.trigger.call(Myo, Myo.events, eventName, args);
      return Myo;
    },
    on: function on(eventName, fn) {
      return emitter.on(Myo.events, eventName, fn);
    },
    off: function off(eventName) {
      Myo.events = emitter.off(Myo.events, eventName);
      return Myo;
    },
    connect: function connect(appId, socketLib) {
      if (socketLib) Socket = socketLib;
      if (!Socket) throw "MYO: Must provide a socket library to use. Try 'Myo.setSocketLib('id', require('ws'))' before you connect.";

      if (appId) {
        Myo.defaults.app_id = appId;
      }

      Myo.socket = new Socket(Myo.defaults.socket_url + Myo.defaults.api_version + '?appid=' + Myo.defaults.app_id);
      Myo.socket.onmessage = Myo.handleMessage;
      Myo.socket.onopen = Myo.trigger.bind(Myo, 'ready');
      Myo.socket.onclose = Myo.trigger.bind(Myo, 'socket_closed');
      Myo.socket.onerror = Myo.onError;
    },
    disconnect: function disconnect() {
      Myo.socket.close();
    },
    handleMessage: function handleMessage(msg) {
      var data = JSON.parse(msg.data)[1];
      if (!data.type || typeof data.myo === 'undefined') return;

      if (data.type == 'paired') {
        var exists = Myo.myos.some(function (myo) {
          return myo.macAddress == data.mac_address;
        });

        if (!exists) {
          Myo.myos.push(Myo.create({
            macAddress: data.mac_address,
            name: data.name,
            connectIndex: data.myo
          }));
        }
      }

      Myo.myos.map(function (myo) {
        if (myo.connectIndex === data.myo) {
          var isStatusEvent = true;

          if (eventTable[data.type]) {
            isStatusEvent = eventTable[data.type](myo, data);
          }

          if (!eventTable[data.type] || isStatusEvent) {
            myo.trigger(data.type, data, data.timestamp);
            myo.trigger('status', data, data.timestamp);
          }
        }
      });
    },
    create: function create(props) {
      var myoProps = utils.merge({
        macAddress: undefined,
        name: undefined,
        connectIndex: undefined,
        locked: true,
        connected: false,
        synced: false,
        batteryLevel: 0,
        lastIMU: undefined,
        arm: undefined,
        direction: undefined,
        warmupState: undefined,
        orientationOffset: {
          x: 0,
          y: 0,
          z: 0,
          w: 1
        },
        events: []
      }, props || {});
      return utils.merge(Object.create(Myo.methods), myoProps);
    },
    methods: {
      trigger: function trigger(eventName) {
        var args = Array.prototype.slice.apply(arguments).slice(1);
        emitter.trigger.call(this, Myo.events, eventName, args);
        emitter.trigger.call(this, this.events, eventName, args);
        return this;
      },
      _trigger: function _trigger(eventName) {
        var args = Array.prototype.slice.apply(arguments).slice(1);
        emitter.trigger.call(this, this.events, eventName, args);
        return this;
      },
      on: function on(eventName, fn) {
        return emitter.on(this.events, eventName, fn);
      },
      off: function off(eventName) {
        this.events = emitter.off(this.events, eventName);
        return this;
      },
      lock: function lock() {
        Myo.socket.send(JSON.stringify(["command", {
          "command": "lock",
          "myo": this.connectIndex
        }]));
        return this;
      },
      unlock: function unlock(hold) {
        Myo.socket.send(JSON.stringify(["command", {
          "command": "unlock",
          "myo": this.connectIndex,
          "type": hold ? "hold" : "timed"
        }]));
        return this;
      },
      zeroOrientation: function zeroOrientation() {
        this.orientationOffset = utils.quatInverse(this.lastQuant);
        this.trigger('zero_orientation');
        return this;
      },
      vibrate: function vibrate(intensity) {
        intensity = intensity || 'medium';
        Myo.socket.send(JSON.stringify(['command', {
          "command": "vibrate",
          "myo": this.connectIndex,
          "type": intensity
        }]));
        return this;
      },
      requestBluetoothStrength: function requestBluetoothStrength() {
        Myo.socket.send(JSON.stringify(['command', {
          "command": "request_rssi",
          "myo": this.connectIndex
        }]));
        return this;
      },
      requestBatteryLevel: function requestBatteryLevel() {
        Myo.socket.send(JSON.stringify(['command', {
          "command": "request_battery_level",
          "myo": this.connectIndex
        }]));
        return this;
      },
      streamEMG: function streamEMG(enabled) {
        Myo.socket.send(JSON.stringify(['command', {
          "command": "set_stream_emg",
          "myo": this.connectIndex,
          "type": enabled ? 'enabled' : 'disabled'
        }]));
        return this;
      }
    }
  };
  var eventTable = {
    //Stream Events
    'pose': function pose(myo, data) {
      if (myo.lastPose) {
        myo.trigger(myo.lastPose + '_off');
        myo.trigger('pose_off', myo.lastPose);
      }

      if (data.pose == 'rest') {
        myo.trigger('rest');
        myo.lastPose = null;
        if (Myo.lockingPolicy === 'standard') myo.unlock();
      } else {
        myo.trigger(data.pose);
        myo.trigger('pose', data.pose);
        myo.lastPose = data.pose;
        if (Myo.lockingPolicy === 'standard') myo.unlock(true);
      }
    },
    'orientation': function orientation(myo, data) {
      myo.lastQuant = data.orientation;
      var ori = utils.quatRotate(myo.orientationOffset, data.orientation);
      var imu_data = {
        orientation: ori,
        accelerometer: {
          x: data.accelerometer[0],
          y: data.accelerometer[1],
          z: data.accelerometer[2]
        },
        gyroscope: {
          x: data.gyroscope[0],
          y: data.gyroscope[1],
          z: data.gyroscope[2]
        }
      };
      if (!myo.lastIMU) myo.lastIMU = imu_data;
      myo.trigger('orientation', imu_data.orientation, data.timestamp);
      myo.trigger('accelerometer', imu_data.accelerometer, data.timestamp);
      myo.trigger('gyroscope', imu_data.gyroscope, data.timestamp);
      myo.trigger('imu', imu_data, data.timestamp);
      myo.lastIMU = imu_data;
    },
    'emg': function emg(myo, data) {
      myo.trigger(data.type, data.emg, data.timestamp);
    },
    //Status Events
    'arm_synced': function arm_synced(myo, data) {
      myo.arm = data.arm;
      myo.direction = data.x_direction;
      myo.warmupState = data.warmup_state;
      myo.synced = true;
      return true;
    },
    'arm_unsynced': function arm_unsynced(myo, data) {
      myo.arm = undefined;
      myo.direction = undefined;
      myo.warmupState = undefined;
      myo.synced = false;
      return true;
    },
    'connected': function connected(myo, data) {
      myo.connectVersion = data.version.join('.');
      myo.connected = true;
      return true;
    },
    'disconnected': function disconnected(myo, data) {
      myo.connected = false;
      return true;
    },
    'locked': function locked(myo, data) {
      myo.locked = true;
      return true;
    },
    'unlocked': function unlocked(myo, data) {
      myo.locked = false;
      return true;
    },
    'warmup_completed': function warmup_completed(myo, data) {
      myo.warmupState = 'warm';
      return true;
    },
    'rssi': function rssi(myo, data) {
      data.bluetooth_strength = utils.getStrengthFromRssi(data.rssi);
      myo.trigger('bluetooth_strength', data.bluetooth_strength, data.timestamp);
      myo.trigger('rssi', data.rssi, data.timestamp);
      myo.trigger('status', data, data.timestamp);
    },
    'battery_level': function battery_level(myo, data) {
      myo.batteryLevel = data.battery_level;
      myo.trigger('battery_level', data.battery_level, data.timestamp);
      myo.trigger('status', data, data.timestamp);
    }
  };
  var emitter = {
    eventCounter: 0,
    trigger: function trigger(events, eventName, args) {
      var self = this;
      events.map(function (event) {
        if (event.name == eventName) event.fn.apply(self, args);

        if (event.name == '*') {
          var args_temp = args.slice(0);
          args_temp.unshift(eventName);
          event.fn.apply(self, args_temp);
        }
      });
      return this;
    },
    on: function on(events, name, fn) {
      var id = new Date().getTime() + "" + emitter.eventCounter++;
      events.push({
        id: id,
        name: name,
        fn: fn
      });
      return id;
    },
    off: function off(events, name) {
      events = events.reduce(function (result, event) {
        if (event.name == name || event.id == name || !name) {
          return result;
        }

        result.push(event);
        return result;
      }, []);
      return events;
    }
  };
  var utils = {
    merge: function merge(obj1, obj2) {
      for (var attrname in obj2) {
        obj1[attrname] = obj2[attrname];
      }

      return obj1;
    },
    quatInverse: function quatInverse(q) {
      var len = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
      return {
        w: q.w / len,
        x: -q.x / len,
        y: -q.y / len,
        z: -q.z / len
      };
    },
    quatRotate: function quatRotate(q, r) {
      return {
        w: q.w * r.w - q.x * r.x - q.y * r.y - q.z * r.z,
        x: q.w * r.x + q.x * r.w + q.y * r.z - q.z * r.y,
        y: q.w * r.y - q.x * r.z + q.y * r.w + q.z * r.x,
        z: q.w * r.z + q.x * r.y - q.y * r.x + q.z * r.w
      };
    },
    getStrengthFromRssi: function getStrengthFromRssi(rssi) {
      var min = -95;
      var max = -40;
      rssi = rssi < min ? min : rssi;
      rssi = rssi > max ? max : rssi;
      return Math.round((rssi - min) * 100 / (max - min) * 100) / 100;
    }
  };
  if (typeof window !== 'undefined') window.Myo = Myo;
  if (typeof module !== 'undefined') module.exports = Myo;
})();
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50618" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","myo.js"], null)
//# sourceMappingURL=/myo.8f1d69e1.js.map