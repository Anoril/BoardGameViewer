angular.module("http_rest_myth", ["common.mongolab", 'ui.bootstrap'])

	.factory("MythGameData", ["MongolabService", function(service) {
		return service("mythgamedata");
	}]);
