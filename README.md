# js

## Class

Wrapper to create classes, allow inheritance and polymorphisme.
These functions can be call directly:
  - number = add a number variable
  - string = add a string variable
  - array = add an array variable
  - object = add an object variable
  - function = add an function
  - extend = extend from a Parent class
  - buid = generate the final class

An example is better than a long speech :)

```js

// == Parent class
var Parent = Class(function (a) { // Constructor of the class
	this.a = a;
})
  // This function add a number variable (named 'a') to the class and a getter and setter by default
	.number('a', true, true) 
	.build(); // Generate the class

// == First child class
var Child = Class(function (a, b) {
  // Call to parent constructor
	this.$Parent(a);
	this.b = b;
})
  // Inherited from Parent
	.extend('Parent', Parent)
	// Add a number variable and a getter by default
	.number('b', true) 
	.build();
	
// == Last child class
var Child2 = Class(function (a, b, c) {
 // Call parent constructor
	this.$Child(a, b);
	this.c = c;
})
	.extend('Child', Child)
	.number('c', true)
	// Add a function named 'getA' (who is already in the class Parent)
	.function('getA', function () {
	  // Call the based function getA and return this value plus one
		return 1 + this.$Child_getA(); 
	})
	.build();
```
