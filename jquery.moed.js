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
		$e.addClass('jqedit').hide();


		function createElements() {
			$e.after($('<div/>').after('<input></input>')
				.filter('div')
					.attr('id', 'jqedit-preview-' + id)
					.addClass('preivew')
					.html($e.val()) 
				.end() 
				.filter('input')
					.attr('id', 'jqedit-input-' + id)
					.addClass('input')
					.val($e.val())
					.hide()
				.end().after($('<ul/>')
					.attr('id', 'jqedit-dropdown-' + id)
					.addClass('dropdown')
				)
			);

			var dd = $('#jqedit-dropdown-' + id).hide();
			$e.find('option').each(function() {
				dd.append($('<li value="'+this.value+'">'+this.text+'</li>'));
			});
		}

		function registerEvents() {
			$('#jqedit-preview-' + id)
				.on('mouseenter mouseleave', function(e) {
					$e.trigger('previewHover.jqedit', [this]);
				})
				.on('dblclick', function(e) {
					e.preventDefault();
					$e.trigger('startEdit.jqedit', [this]);
					$e.trigger('focusInput.jqedit', [this]);
				}
			);

			$('#jqedit-input-' + id)
				.on('keypress', function(e) {
					console.log('keypress: ' + e.which);
				})
				.on('keydown', function(e) {
					console.log('keydown: ' + e.which);
					switch (e.which) {
						case 27:
							if (!$e.data('editing')) break;
							$e.trigger('stopEdit.jqedit', [this]);
							break;
						case 13:
							if (!$e.data('editing')) break;
							$e.trigger('submit.jqedit', [this]);
							break;
					}
				}
			);
			$('#jqedit-dropdown-' + id);

			// Externally triggered to update various plugin components
			$e.on('startEdit.jqedit', function(e, opt) {
				if ($e.data('editing')) return;
				$('#jqedit-preview-' + id).hide();		
				$('#jqedit-input-' + id).show();		
				$e.data('editing', true);
			}).on('stopEdit.jqedit', function(e, opt) {
				if (!$e.data('editing')) return;
				$('#jqedit-input-' + id).hide();		
				$('#jqedit-preview-' + id).show();
				$e.data('editing', false);
			}).on('focusInput.jqedit', function(e, opt) {
				if (!$e.data('editing')) return;
				$('#jqedit-input-' + id).focus();
			}).on('previewUpdate.jqedit', function(e, opt) {
				console.log(opt.display + ' ' + opt.value);
			});
		}

		createElements();
		registerEvents();
	};
}(jQuery));
