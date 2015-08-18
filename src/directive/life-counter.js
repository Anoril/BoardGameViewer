angular.module("directives")
	.directive("lifeCounter", ["SOCKET", function(SOCKET) {

	return {
		restrict: "E",
		templateUrl: "/src/directive/life-counter.tpl.html",
		scope: {
			max: "=max",
			current: "=current",
			id: "=id"
		},
		link: function ($scope) {

			$scope.getArray = function() {
				var array = [];
				for (var i = 1; i <= $scope.max; i++) {
					array.push(i);
				}
				return array;
			};

			$scope.setCurrentValue = function (value) {
				console.log("This is " + $scope.id);
				$scope.current = value;
				
				SOCKET.emit('event', 
						{
							type: "life_update",
							value: value,
							id: $scope.id
						});
			};
			
			
			SOCKET.on('life_update', function (message) {
				if ($scope.id == message.id) {
					$scope.current = message.value;
					$scope.$apply();
				}
			});
		}
	}
}]);
