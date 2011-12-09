(function($) {
	var defaults = {
	};

	$.fn.edit = function(options) {
		return this.each(function() {
			var $this = $(this);
			if (!$this.hasClass('jqedit')) new Edit($this, $.extend({}, defaults, options));
		};
	};

	var Edit = function($e, options) {
	};
}(jQuery);
