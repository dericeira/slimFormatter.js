# slimFormatter.js

A simple and clean Date, Time Ago and Currency formatter library for Javascript

## Install:
NPM:
```
npm install slim-formatter
```


## Usage:

### Currency 

slimFormatter.currency(number, symbol, thousand_separator, decimal_separator, symbol_before?);

```js
var number = slimFormatter.currency(2000.54);
var number = slimFormatter.currency(2000.54,'R$ ','.',',');
var number = slimFormatter.currency(2000.54,' €',',','.',false);
```

### Date 

slimFormatter.date(date, format);

```js
var date = slimFormatter.date('2015-03-25', 'dd');
var date = slimFormatter.date('2015-03-25T12:00:00');
var date = slimFormatter.date('Wed Mar 25 2015 09:56:24 GMT+0100', '"MM-yyyy hh:mmt"');
var date = slimFormatter.date(1478790151906, 'yyyy-MM-dd HH:mm:ss');
```

### Time Ago 

slimFormatter.timeAgo(date, ago_string, hour_string, minute_string, second_string);

```js
var date = slimFormatter.timeAgo.date(1478790151906); // x days/minutes/seconds ago
var date = slimFormatter.timeAgo.date('2015-03-25', 'atrás'); // x days/minutes/seconds atrás
var date = slimFormatter.timeAgo('2015-03-25T12:00:00', '', 'horas'); // x horas/minutes/seconds
```