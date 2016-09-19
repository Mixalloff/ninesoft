(function () {
    'use strict';
    angular
        .module('app.comments')
        .controller('CommentsController', commentsController);
    
    function commentsController(WebSocketService) {
        var vm = this;
        vm.comments = config.comments;
        vm.deleteComment = requestFactory(deleteComment);

        function requestFactory(callback) {
            var callback_id = 0;
            var stack = [];
            return function (args) {
                stack.push({ callback_id: callback_id, args: args});
                WebSocketService.deleteComment(callback_id++)
                    .then(function(response) {
                        for (var i = 0; i < stack.length; i++) {
                            if (response.callback_id == stack[i].callback_id) {
                                callback(stack[i].args);
                                stack.splice(i, 1);
                            }
                        }
                    });
            }
        }

        function deleteComment(comment) {
            for (var i = 0; i < vm.comments.length; i++) {
                if (vm.comments[i].$$hashKey == comment.$$hashKey) {
                    vm.comments.splice(i, 1);
                }
            }
        }
    }

    var config = {
        comments: [
            { text: 'Тестовый коммент 1' },
            { text: 'Это шедевр' },
            { text: 'Это прекрасно' },
            { text: 'Лучшее, что я видел' },
            { text: 'Два чая этому автору' }
        ]
    }
})();