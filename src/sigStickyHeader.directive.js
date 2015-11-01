(function() {
    'use strict';
    angular.module('sigStickyHeader', [])
        .directive('sigStickyHeader', SigStickyHeader);

    function SigStickyHeader() {
        var directive;

        function link(scope, element) {
            var originalProperties = element.css(['position', 'top', 'left', 'zIndex']);
            var positionFixedProperties = {
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1
            };

            window.addEventListener("scroll", function() {

                element.css(originalProperties);

                if (element[0].getBoundingClientRect().top < 0) {
                    element.css(positionFixedProperties);
                    element.toggleClass(['sig-sh-fixed', 'sig-sh-original']);
                } else {
                    element.css(originalProperties);
                    element.toggleClass(['sig-sh-fixed', 'sig-sh-original']);
                }
            });
        }

        directive = {
            link: link
        };

        return directive;
    }
}());
