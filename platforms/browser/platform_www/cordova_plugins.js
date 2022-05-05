cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-is-debug/www/isDebug.js",
        "id": "cordova-plugin-is-debug.IsDebug",
        "pluginId": "cordova-plugin-is-debug",
        "clobbers": [
            "cordova.plugins.IsDebug"
        ]
    },
    {
        "file": "plugins/cordova-plugin-check-debugger/www/checkDebugger.js",
        "id": "cordova-plugin-check-debugger.checkDebugger",
        "pluginId": "cordova-plugin-check-debugger",
        "clobbers": [
            "checkDebugger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-root-detection/www/rootdetection.js",
        "id": "cordova-plugin-root-detection.RootDetection",
        "pluginId": "cordova-plugin-root-detection",
        "clobbers": [
            "rootdetection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-is-debug": "1.0.0",
    "cordova-plugin-check-debugger": "1.0.0",
    "cordova-plugin-root-detection": "0.1.1"
}
// BOTTOM OF METADATA
});