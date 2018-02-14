(function() {
    angular
        .module('app')
        .directive('numeric', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    createEvents('numeric', element);
                }
            }
        })
        .directive('float', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    createEvents('float', element);
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
        .directive('letters', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    createEvents('letters', element);
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
        .directive('select', function($rootScope) {
            return {
                require: 'ngModel',
                priority: 100,
                link: function(scope, element, attr, ngModel) {
                    var observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type == 'childList') {
                                for (var x in mutation.addedNodes) {
                                    if (mutation.addedNodes[x].value && (mutation.addedNodes[x].value == '?' || mutation.addedNodes[x].value.split('? number').length > 1 || mutation.addedNodes[x].value.split('? undefined').length > 1) && element[0].options[x].value && (element[0].options[x].value == '?' || mutation.addedNodes[x].value.split('? number').length > 1 || mutation.addedNodes[x].value.split('? undefined').length > 1)) {
                                        element[0].options.remove(x);
                                    }
                                }
                            }
                        });
                    });
                    var config = { attributes: true, childList: true, characterData: true };
                    // pass in the target node, as well as the observer options
                    observer.observe(element[0], config);
                }
            };
        })
        .directive('uppercased', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, modelCtrl) {
                    modelCtrl.$parsers.push(function(input) {
                        return input ? input.toUpperCase() : "";
                    });
                    element.css("text-transform", "uppercase");
                }
            };
        })
        .directive('labelCount', function($compile) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    ngModel: '='
                },
                link: function(scope, element, attr) {
                    attr.maxlength = attr.maxlength || attr.maxsize;
                    var html = `
                        <label style="width:100%;text-align:center;font-weight:bold;">{{ngModel.length ? ngModel.length : 0}} de ${attr.maxlength} caracteres.</label>
                    `;
                    var myElements = angular.element(element[0].parentNode);
                    html = angular.element(html);


                    myElements.append(html);
                    $compile(html)(scope);
                }
            }
        })
        .directive('noApostrophe', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attr, ngModelCtrl) {
                    element.bind("keypress", function(event) {
                        if (event.which == 39) {
                            return false;
                        }
                    })
                }
            };
        })
        .directive('rfcProveedor', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attr, ngModelCtrl) {
                    element.bind("keydown keypress", function(event) {
                        if ((event.which != 8) && (event.which != 38) && (event.which != 16) && !(event.which >= 48 && event.which <= 57) && !(event.which >= 65 && event.which <= 90) && !(event.which >= 97 && event.which <= 122) && !(event.which == 47)) {
                            event.preventDefault();
                        }
                    });
                }
            };
        })
		.directive('fileModel', ['$parse', function ($parse) {
		    return {
		        restrict: 'A',
		        link: function(scope, element, attrs) {
		            var model = $parse(attrs.fileModel);
		            var modelSetter = model.assign;

		            element.bind('change', function(){
		                scope.$apply(function(){
		                    modelSetter(scope, element[0].files[0]);
		                });
		            });
		        }
		    };
		}]);


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
            case 'float':
                if (parseFloat(val) || (event.key == '.' && event.target.value.indexOf(".") == -1) || val == 0 && val != ' ') {
                    valid = true;
                }
                break;
            case 'alphanumeric':
                if (!/[^a-zA-Z0-9? ,/().ñ]/.test(val)) {
                    valid = true;
                }
                break;
            case 'letters':
                if (!/[^a-zA-Z? ,ñ]/.test(val)) {
                    valid = true;
                }
            default:
                break;
        }
        return valid;
    }
})();
