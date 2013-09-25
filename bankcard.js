/**
 * Bank card input control plugin
 *
 * Split card number into 4 groups, every group include 4 numbers.
 * And a pop layer will show up to emphasize the input value.
 *
 * https://github.com/hulufei/bankcard-input.git
 *
 */
~function($) {
  $.fn.bankcard = function(options) {
    options = options || {};

    var $input = this
      , $pop
      , limit = options.limit || 16
      , popClass = options.pop || '';

    $input.on('keypress', function(e) {
      var s = String.fromCharCode(e.which)
        , value = $input.val()
        , position;

      if (e.which !== 8 &&
          (!/\d/.test(s) || value.replace(/\s/g, '').length === limit)) return false;

      // Else input number
      if (!$pop) {
        position = $input.position();

        $pop = $('<div/>');

        if (popClass) $pop.addClass(popClass);

        $input.after($pop);
      }
      else {
        $pop.show();
      }
    });

    // Actually got the input value in keyup
    $input.on('keyup', function(e) {
      var value = $input.val()
        , arr;

      if (value === '' && $pop) {
        $pop.hide();
      }
      else if (e.which !== 8 && value.length >= 4) {
        // Split into groups
        arr = value.replace(/\s/g, '').match(/.{1,4}/g) || [];
        value = arr.join(' ');
        // Add last space every four, except last group
        if (arr.length > 0 && arr.length < 4 && arr.pop().length === 4) value += ' ';
        $input.val(value);
      }

      if ($pop) $pop.html(value);
    });

    // Hide the pop layer when blur
    $input.on('blur', function() {
      if ($pop) $pop.hide();
    });

    // Show the pop layer when focus
    $input.on('focus', function() {
      if ($pop && $(this).val() !== '') $pop.show();
    });
  };
}(jQuery);