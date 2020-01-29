cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-sslcertificatechecker.SSLCertificateChecker",
      "file": "plugins/cordova-plugin-sslcertificatechecker/www/SSLCertificateChecker.js",
      "pluginId": "cordova-plugin-sslcertificatechecker",
      "clobbers": [
        "window.plugins.sslCertificateChecker"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-iroot.IRoot",
      "file": "plugins/cordova-plugin-iroot/www/iroot.js",
      "pluginId": "cordova-plugin-iroot",
      "clobbers": [
        "IRoot"
      ]
    },
    {
      "id": "cordova-plugin-is-debug.IsDebug",
      "file": "plugins/cordova-plugin-is-debug/www/isDebug.js",
      "pluginId": "cordova-plugin-is-debug",
      "clobbers": [
        "cordova.plugins.IsDebug"
      ]
    },
    {
      "id": "cordova-plugin-antitampering.AntiTampering",
      "file": "plugins/cordova-plugin-antitampering/www/AntiTampering.js",
      "pluginId": "cordova-plugin-antitampering",
      "clobbers": [
        "cordova.plugins.AntiTampering"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-sslcertificatechecker": "6.0.0",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-iroot": "0.8.1",
    "cordova-plugin-is-debug": "1.0.0",
    "cordova-plugin-antitampering": "0.3.0"
  };
});