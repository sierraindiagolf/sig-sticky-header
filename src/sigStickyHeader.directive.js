(function() {
    'use strict';
    angular.module('sigStickyHeader', [])
        .directive('sigStickyHeader', SigStickyHeader);

    function SigStickyHeader() {
        var directive;

        function link(scope, element, attributes) {
            var originalProperties = element.css(['position', 'top', 'left', 'zIndex']);
            var initialBoundingClient = element[0].getBoundingClientRect();
            var positionFixedProperties = {
                position: 'fixed',
                top: 0,
                left: initialBoundingClient.left,
                width: initialBoundingClient.width,
                zIndex: 1
            };

            window.addEventListener("scroll", setPosition);

            function setPosition() {

                element.css(originalProperties);

                var boundingClientRect = element[0].getBoundingClientRect();
                if (boundingClientRect.top < 0) {
                    element.css(positionFixedProperties);
                    element.addClass('sig-sh-fixed');
                    element.removeClass('sig-sh-original');
                    addClasses(attributes, 'Fixed');
                } else {
                    element.css(originalProperties);
                    element.removeClass('sig-sh-fixed');
                    element.addClass('sig-sh-original');
                    addClasses(attributes, 'Original');
                }
            }

            function addClasses(attributes, position, addOrRemove) {
                if (!addOrRemove) {
                    var pos = position === 'Fixed' ? 'Original' : 'Fixed';
                    addClasses(attributes, pos, element.removeClass);
                }

                addOrRemove = element.addClass;

                if (attributes['shClasses' + position]) {
                    addOrRemove(attributes['shClasses' + position]);
                }
            }

            setPosition();
        }

        directive = {
            link: link
        };

        return directive;
    }
}());
