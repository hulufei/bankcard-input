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
      , popClass = options.pop || '';

    $input.on('keypress', function(e) {
      var s = String.fromCharCode(e.which)
        , value = $input.val()
        , position;

      if (!/[\d\b]/.test(s) || /^(\d{4}\s){3}\d{4}$/.test(value)) return false;

      // Else input number
      if (!$pop) {
        position = $input.position();

        $pop = $('<div/>').css({
          position: 'relative',
          left: position.left,
          top: position.top - $input.height()
        });

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
        , i , arr;

      if (value === '' && $pop) {
        $pop.hide();
      }
      else if (e.which !== 8 && value.length >= 4) {
        // Split into groups
        arr = value.split(' ');
        for (i = 0; i < arr.length; i++) {
          // Except last group
          if (i < 3 && arr[i].length === 4) arr[i] += ' ';
        }
        value = arr.join('');
        $input.val(value);
      }

      if ($pop) $pop.html(value);
    });
  };
}(jQuery);