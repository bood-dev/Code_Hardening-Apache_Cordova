/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.certificatePinning('certificatePinning');
        this.runningOnEmulator('runningOnEmulator');
        this.deviceRooted('deviceRooted');
        this.isDebug('isDebug');
        this.integrityCheck('integrityCheck');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
    },

    // [ MSTG-NETWORK-4 ]
    // Testing Custom Certificate Stores and Certificate Pinning
    certificatePinning: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        var server = "https://dimex.azurewebsites.net";
        var fingerprint = "B1 C6 07 C5 51 5F 4D 69 15 4F B9 59 47 5C DD FD D7 2E 72 36 0C FC 42 77 71 DC 69 21 4F 3C 0C 99"; // 99

        window.plugins.sslCertificateChecker.check(
            successCallback,
            errorCallback,
            server,
            fingerprint
        );
        
        function successCallback(message) {
            listeningElement.setAttribute('style', 'display: none;');
            receivedElement.setAttribute('style', 'display: block;');

            receivedElement.innerHTML = message;
        }
        
        function errorCallback(message) {
            listeningElement.setAttribute('style', 'display: none;');
            failedElement.setAttribute('style', 'display: block;');

            if (message === "CONNECTION_NOT_SECURE") {
                failedElement.innerHTML = message;
            } else if (message.indexOf("CONNECTION_FAILED") >- 1) {
                failedElement.innerHTML = "CONNECTION_FAILED";
            } else {
                failedElement.innerHTML = "CAN'T_CHECK";
            }
        }
    },

    // [ MSTG-RESILIENCE-5 ]
    // Testing Emulator Detection
    runningOnEmulator: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        if (device.isVirtual == true) {
            listeningElement.setAttribute('style', 'display:none;');
            failedElement.setAttribute('style', 'display:block;');

            failedElement.innerHTML = device.isVirtual; 
        }
        else {
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            receivedElement.innerHTML = device.isVirtual;
        }
    },

    // [ MSTG-RESILIENCE-1 ]
    // Testing Root Detection
    deviceRooted: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        IRoot.isRooted(successCallback, failureCallback);

        function successCallback(result) {
            listeningElement.setAttribute('style', 'display: none;');

            if (result == true) {
                failedElement.setAttribute('style', 'display: block;');
                failedElement.innerHTML = "TRUE";
            } else {
                receivedElement.setAttribute('style', 'display: block;');
                receivedElement.innerHTML = "FALSE";
            }
        }

        function failureCallback(result) {
            listeningElement.setAttribute('style', 'display: none;');
            failedElement.setAttribute('style', 'display: block;');

            failedElement.innerHTML = result;
        }
    },

    // [ MSTG-RESILIENCE-2 ]
    // Testing anti-debugging detection
    isDebug: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        cordova.plugins.IsDebug.getIsDebug(function(isDebug) {
            listeningElement.setAttribute('style', 'display: none;');

            if (isDebug == true) {
                failedElement.setAttribute('style', 'display: block;');
                failedElement.innerHTML = isDebug;   
            } else {
                receivedElement.setAttribute('style', 'display: block;');
                receivedElement.innerHTML = isDebug;   
            }
        }, function (err) {
            listeningElement.setAttribute('style', 'display: none;');
            failedElement.setAttribute('style', 'display: block;');

            failedElement.innerHTML = err;
        });
    },

    // [ MSTG-RESILIENCE-6 ] 
    // Testing run time integrity checks
    integrityCheck: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var failedElement = parentElement.querySelector('.failed');

        window.cordova.plugins.AntiTampering.verify(
            function (success) {
                console.info(success);
                // {"assets": {"count": x}} - where x is the number of assets checked
            },
            function (error) {
                console.error(error);
                // gives you the file on which tampering was detected
            }
        );
    }
};

app.initialize();