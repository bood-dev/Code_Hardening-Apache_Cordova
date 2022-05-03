cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-is-debug.IsDebug",
      "file": "plugins/cordova-plugin-is-debug/www/isDebug.js",
      "pluginId": "cordova-plugin-is-debug",
      "clobbers": [
        "cordova.plugins.IsDebug"
      ]
    },
    {
      "id": "cordova-plugin-check-debugger.checkDebugger",
      "file": "plugins/cordova-plugin-check-debugger/www/checkDebugger.js",
      "pluginId": "cordova-plugin-check-debugger",
      "clobbers": [
        "checkDebugger"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-is-debug": "1.0.0",
    "cordova-plugin-check-debugger": "1.0.0"
  };
});