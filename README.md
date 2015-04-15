# js

## Class

Wrapper to create classes, allow inheritance and polymorphisme.

An example is better than a long speech :)

```js

var Parent = Class(
{
	
	init: function (a) {
		this.a = a;
	},

	attributes: {
		'a': 0
	}

}).build();

var Child = Class(
{
	init: function (a, b) {
		this.$Parent(a);
		this.b = b;
	},

	attributes: {
		'b': 0
	}

}).extend('Parent', Parent).build();

var Child2 = Class(
{
	init: function (a, b, c) {
		this.$Child(a, b);
		this.c = c;
	},

	attributes: {
		'c': 0
	},

	functions: {
		'getA': function () {
			return 1 + this.$Child_getA();
		}
	}

}).extend('Child', Child).build();
```
