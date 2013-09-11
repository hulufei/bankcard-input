/*global describe, it */
'use strict';

describe('Bankcard Input Plugin', function () {
  beforeEach(function() {
    this.$fixture = $('<div/>').appendTo('body');
    this.$input = $('<input type="text"/>').appendTo(this.$fixture);
  });

  afterEach(function() {
    this.$fixture.remove();
  });

  it('should work as a jQuery plugin', function() {
    expect(this.$input.bankcard).to.exist;
  });

  it('should ignore the input that is not a number', function() {
    this.$input.bankcard();
    this.$input.autotype('a');

    expect(this.$input.val()).to.equal('');
    expect(this.$input.siblings('div')).to.have.length(0);
  });

  it('should input numbers', function() {
    this.$input.bankcard();
    this.$input.autotype('18');
    expect(this.$input.val()).to.equal('18');
  });

  it('should enable back-space', function() {
    this.$input.bankcard();
    this.$input.autotype('186{{back}}');
    expect(this.$input.val()).to.equal('18');
  });

  it('should pop over a layer emphasize the input number', function() {
    this.$input.bankcard();
    this.$input.autotype('1');

    expect(this.$input.val()).to.equal('1');
    expect(this.$input.siblings('div').length).to.be.equal(1);
    expect(this.$input.siblings('div').is(':hidden')).to.be.false;
    expect(this.$input.siblings('div').text()).to.be.equal('1');
  });

  it('can specify class to pop over layer', function() {
    this.$input.bankcard({ pop: 'customStyle' });
    this.$input.autotype('1');

    expect(this.$input.siblings('div').hasClass('customStyle')).to.be.true;
  });

  it('should split input numbers into groups every four', function() {
    this.$input.bankcard();
    this.$input.autotype('12345');

    expect(this.$input.val()).to.equal('1234 5');
    expect(this.$input.siblings('div').length).to.be.equal(1);
    expect(this.$input.siblings('div').text()).to.be.equal('1234 5');
  });

  it('should delete back normally in groups', function() {
    this.$input.bankcard();
    this.$input.autotype('1234{{back}}');

    expect(this.$input.val()).to.equal('1234');
    expect(this.$input.siblings('div').text()).to.be.equal('1234');
  });

  it('should split numbers into groups input after delete back', function() {
    this.$input.bankcard();
    this.$input.autotype('1234{{back}}5');

    expect(this.$input.val()).to.equal('1234 5');
    expect(this.$input.siblings('div').text()).to.be.equal('1234 5');
  });

  it('should limit to 16 numbers', function() {
    this.$input.bankcard();
    this.$input.autotype('8888 8888 8888 8888 9');

    expect(this.$input.val()).to.equal('8888 8888 8888 8888');
    expect(this.$input.siblings('div').text()).to.be.equal('8888 8888 8888 8888');
  });

  it('should delete back when reach to 16 numbers', function() {
    this.$input.bankcard();
    this.$input.autotype('8888 8888 8888 8888{{back}}');

    expect(this.$input.val()).to.equal('8888 8888 8888 888');
    expect(this.$input.siblings('div').text()).to.be.equal('8888 8888 8888 888');
  });

  it('should hide the emphasize layer when input empty', function() {
    this.$input.bankcard();
    this.$input.autotype('1{{back}}');

    expect(this.$input.siblings('div').is(':hidden')).to.be.true;
  });

  it('should hide the emphasize layer when input blur', function() {
    this.$input.bankcard();
    this.$input.autotype('1');
    this.$input.trigger('blur');

    expect(this.$input.siblings('div').is(':hidden')).to.be.true;
  });

  it('should be show again when input number', function() {
    this.$input.bankcard();
    this.$input.autotype('1{{back}}');
    this.$input.autotype('1');

    expect(this.$input.siblings('div').length).to.be.equal(1);
    expect(this.$input.siblings('div').is(':hidden')).to.be.false;
  });

  it('should be show again when input focus again', function() {
    this.$input.bankcard();
    this.$input.autotype('1');
    this.$input.trigger('blur').trigger('focus');

    expect(this.$input.siblings('div').length).to.be.equal(1);
    expect(this.$input.siblings('div').is(':hidden')).to.be.false;
  });
});
