# slimFormatter.js

A simple and clean Date, Time Ago and Currency formatter library for Javascript


Usage:

slimFormatter.currency(number, symbol, thousand_separator, decimal_separator, symbol_before?);

```js
var number = slimFormatter.currency(2000.54);
var number = slimFormatter.currency(2000.54,'R$ ','.',',');
var number = slimFormatter.currency(2000.54,' €',',','.',false);
``