bankcard-input
==============

A bank card include 16 numbers, split into 4 groups with space, every group include
4 numbers. And a pop layer will show up to emphasize the input value.

![Screenshot](http://hulufei.github.io/bankcard-input/screenshot.png)

[Demo](http://hulufei.github.io/bankcard-input/demo.html)

## Usage

`$('input').bankcard();`

With specified popover class:

`$('input').bankcard({ pop: 'customClassName' });`

## Options

- `option.pop` `{String}` styles for the pop layer.
