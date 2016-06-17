angular.module('angular-bs-overflow', [])
.directive('overflow', function() {
	return {
		scope: {
			overflow: '@?',
		},
		restrict: 'A',
		link: function($scope, elem) {
			var tooltipElem = $('<div class="tooltip tooltip-overflow in" role="tooltip"><div class="tooltip-inner"></div></div>');
			var tooltipAttached;

			var $elem = $(elem);
			$elem
				.on('mouseover', function() {
					tooltipElem.find('.tooltip-inner').text($scope.overflow);
					if (!tooltipAttached) tooltipAttached = tooltipElem.appendTo($('body'));
					tooltipAttached
						.css($elem.offset())
						.css({
							display: ($elem.width() > $elem.parent().width() - $elem.position().left) ? 'block': 'none',
							width: $elem.width(),
							height: $elem.height(),
						});
				})
				.on('mouseout', function() {
					tooltipAttached.remove();
					tooltipAttached = null;
				});

			$scope.$watch('overflow', function() {
				if (tooltipAttached)
					tooltipAttached.find('.tooltip-inner').text($scope.overflow);
			});
		}
	}
});
