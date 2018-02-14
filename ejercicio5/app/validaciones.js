(function(){
    angular
        .module("validaciones", [])
        .directive('numeric', function(){
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    createEvents('numeric', element);
                }
            }
        })
        .directive('alphanumeric', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    createEvents('alphanumeric', element);
                }
            }
        })
        .directive('dropdown', function() {
            return {
                restrict: 'A',
                link: function($scope, elem, attrs, controller) {
                    $(elem).dropdown();
                }
            };
        })
        function createEvents(type, element) {
            element
                .bind('keypress', function(event) {
                    return validInput(type, event.key || String.fromCharCode(event.keyCode), event);
                })
                .bind('paste', function(event) {
                    var text = event.originalEvent.clipboardData.getData('text');
                    return validInput(type, text, event);
                })
                .bind('drop', function(event) {
                    var text = event.originalEvent.dataTransfer.getData('text');
                    return validInput(type, text, event);
                })
        }

        function validInput(type, val, event) {
            var valid = false;
            valid = val == 'Enter' ? true : false;
            switch (type) {
                case 'numeric':
                    if ((parseInt(val) || val == 0) && val != ' ') {
                        valid = true;
                    }
                    break;
                case 'alphanumeric':
                    if (!/[^a-zA-Z0-9? ,/().ñ]/.test(val)) {
                        valid = true;
                    }
                    break;
                default:
                    break;
            }
            return valid;
        }
})()
