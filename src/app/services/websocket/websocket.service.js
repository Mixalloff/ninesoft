(function(){
    'use strict';

    angular
        .module('app.services')
        .factory('WebSocketService', ['$q', '$rootScope', function($q, $rootScope) {
            var factory = {};
            var callbacks = {};
            var currentCallbackId = 0;
            var ws = new WebSocket(appConfig.websocket.host);
            
            ws.onopen = function(){  
                console.log("Open ws");  
            };
            
            ws.onmessage = function(message) {
                listener(JSON.parse(message.data));
            };

            function sendRequest(request) {
                var defer = $q.defer();
                callbacks[request.callback_id] = {
                    time: new Date(),
                    cb:defer
                };
                console.log('Send request', request);
                ws.send(JSON.stringify(request));
                return defer.promise;
            }

            function listener(data) {
                if(callbacks.hasOwnProperty(data.callback_id)) {
                    $rootScope.$apply(callbacks[data.callback_id].cb.resolve(data));
                    delete callbacks[data.callback_id];
                }
            }
            function getCallbackId() {
                return ++currentCallbackId;
            }

            factory.deleteComment = function (callback_id) {
                var request = {
                    callback_id: callback_id
                }
                var promise = sendRequest(request); 
                return promise;
            }

            return factory;
        }])
})();
