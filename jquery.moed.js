(function($) {
	var defaults = {	
		startPreview: true,
		readOnly: false
	};

	$.fn.edit = function(options) {
		return this.each(function() {
			var $this = $(this);
			if (!$this.hasClass('jqedit')) {
				var edit = new Edit($this, $.extend({}, defaults, options));
			}
		});
	};

	var edId = 0;
	var Edit = function($e, options) {
		var id = ++edId;

		$e.addClass('jqedit original').hide();

		$e.after($('<div/>').after('<input></input>')
			.filter('div')
				.attr('id', 'jqedit-preview-' + id)
				.html($e.val())
				.on('dblclick', function() {
					$e.trigger('edit.jqedit', [this]);
				})
			.end() 
			.filter('input')
				.attr('id', 'jqedit-input-' + id)
				.val($e.val())
			.end()
		);
	};
}(jQuery));
