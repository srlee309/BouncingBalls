(function () {
    'use strict';
    angular
        .module('BouncingBall')
        .directive('heightdrag', heightDrag);
    /*
     * Updates the configured ball heights when the height slider variable is changed
     */
    function heightDrag() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('$md.pressup', function() {
                    var id = "";
                    if (attrs.id.startsWith("left")) {
                        id = ".leftBall";
                    } else {
                        id = ".rightBall";
                    }
                    $(id).animate({'bottom':parseInt(element.context.textContent) + 11}, 600, '', function() {});
                });
            }
        };
    }
})();