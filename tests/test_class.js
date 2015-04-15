var Parent = Class(
{
	
	initialize: function (a) {
		this.a = a;
	},

	attributes: {
		'a': 0
	}

}
).build();

var Child = Class(
{
	initialize: function (a, b) {
		this.$Parent(a);
		this.b = b;
	},

	attributes: {
		'b': 0
	}

}).extend('Parent', Parent).build();

var Child2 = Class(
{
	initialize: function (a, b, c) {
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

var p = new Child2(1, 2, 3);
console.log(p.getA());
console.log(p.getB());
console.log(p.getC());
if (p instanceof Parent)
	console.log('win');

var t1 = new Date().getTime();

for (var i = 0; i < 40000000; ++i) {
	var ch = new Child2(i, i + 1, i + 2);
 	ch.getA();
 	ch.getB();
 	ch.getC();
}

var t2 = new Date().getTime();
var t3 = t2 - t1;
console.log('time: ' + t3);

