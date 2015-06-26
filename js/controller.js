(function (angular) {
    'use strict';
    var myApp = angular.module('rfidController', []);

    myApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.useXDomain = true;
    }]);

    myApp.controller('SpicyController', ['$scope', function ($scope, $http) {
        $scope.method = 'GET';
        $scope.url = 'http://127.0.0.1:8080/RfidRestApp/rest/rfid/serialNumber';

        $scope.spice = 'ssss21311';

        $scope.chiliSpicy = function () {
            $scope.spice = 'chili';
        };

        $scope.jalapenoSpicy = function () {
            $scope.spice = 'jalape?o';
        };
    }]);

    myApp.controller('FetchController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.getCardUID = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card';
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.getCardDetails = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card/details';
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.authenticateBlock = function () {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/ARC122API/rest/card/loadKeyAndAuth/' + $scope.blockNumber,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: [$scope.key1, $scope.key2, $scope.key3, $scope.key4, $scope.key5, $scope.key6]
                };
                $http(req).success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                }).error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
            };

            $scope.readDataBlock = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card/readBlockHex/' + $scope.blockNumberToRead;
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.readDataBlockAscii = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card/readBlockAscii/' + $scope.blockNumberToReadA;
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.writeDataBlock = function () {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/ARC122API/rest/card/write/' + $scope.blockNumberToWrite,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: $scope.dataToWrite
                };
                $http(req).success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                }).error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
            };

            //-------------ATM------------------------------------------------------------------------------------------
            $scope.getCardCurrentAmount = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card/amount';
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };

            $scope.charge = function () {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/ARC122API/rest/card/charge/' + $scope.amount,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(req).success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                }).error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
            };

            //-----------BUS--------------------------------------------------------------------------------------------
            $scope.payTax = function () {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/ARC122API/rest/card/pay/' + $scope.numberOfTickets,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(req).success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                }).error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
            };

            //-------------Credit Card----------------------------------------------------------------------------------
            $scope.getCreditCardInfo = function () {
                $scope.method = 'GET';
                $scope.url = 'http://127.0.0.1:8080/ARC122API/rest/card/creditCard';
                $scope.code = null;
                $scope.response = null;

                $http({method: $scope.method, url: $scope.url}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            };
        }]);
})(window.angular);