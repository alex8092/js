var Parent = Class(function (a) {
	this.a = a;
})
	.number('a', true, true)
	.build();

var Child = Class(function (a, b) {
	this.$Parent(a);
	this.b = b;
})
	.extend('Parent', Parent)
	.number('b', true)
	.build();

var Child2 = Class(function (a, b, c) {
	this.$Child(a, b);
	this.c = c;
})
	.extend('Child', Child)
	.number('c', true)
	.function('getA', function () {
		return 1 + this.$Child_getA();
	})
	.build();

var p = new Child2(1, 2, 3);
console.log(p.getA());
console.log(p.getB());
console.log(p.getC());

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