// var app = angular.module("myApp", ['ngRoute']);

// app.controller('TweetList', ['$scope', '$http', function($scope, $http){
//   {
//     $scope.method = 'GET';
//     $scope.url = 'http-hello.html';

//     $scope.fetch = function() {
//       $scope.code = null;
//       $scope.response = null;

//       $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
//         success(function(data, status) {
//           $scope.status = status;
//           $scope.data = data;
//         }).
//         error(function(data, status) {
//           $scope.data = data || "Request failed";
//           $scope.status = status;
//       });
//     };

//     // headers: {'Authorization': 'Authorization: OAuth oauth_consumer_key="0hsv4sfGN0cVHwGiGaETzhp3D", oauth_nonce="119adbfc838d2959e2be695c8ecdcbd8", oauth_signature="ZSIeKUHIHhPyFwq0jEpaGiCdliA%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1413418472", oauth_token="49639614-H5llFNbDkUln62SbS8kcEzKh2bv81WTqyS58U5M5E", oauth_version="1.0"'}).success(function(res){console.log(res);});
// }]);

