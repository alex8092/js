var Class = (function generate() {
	var ClassBuilder = function (obj) {
		this.__obj = obj.initialize;
		this.__objbuild = obj;
		this.__extends_name = '';
		this.__extends_obj = {};
		return this;
	}

	ClassBuilder.prototype.extend = function (name, classobject) {
		this.__extends_name = name;
		this.__extends_obj = classobject;
		return this;
	}

	ClassBuilder.prototype._functions = function (funcs) {
		for (var i in funcs)
			this.__obj.prototype[i] = funcs[i];
		return this;
	}

	ClassBuilder.prototype._attributes = function (attrs) {
		for (var i in attrs) {
			// if (attrs[i] == 'number')
			// 	this.__obj.prototype[i] = 0;
			// else if (attrs[i] == 'string')
			// 	this.__obj.prototype[i] = '';
			// else if (attrs[i] == 'object')
			// 	this.__obj.prototype[i] = {};
			// else if (attrs[i] == 'array')
			// 	this.__obj.prototype[i] = [];

			this.__obj.prototype[i] = attrs[i];

			this._generate_set_get(i, true, true);
		}
		return this;
	}

	// ClassBuilder.prototype.number = function (name, get, set) {
	// 	this.__obj.prototype[name] = 0;
	// 	this._generate_set_get(name, get, set);
	// 	return this;
	// }

	// ClassBuilder.prototype.string = function (name, get, set) {
	// 	this.__obj.prototype[name] = '';
	// 	this._generate_set_get(name, get, set);
	// 	return this;
	// }

	// ClassBuilder.prototype.array = function (name, get, set) {
	// 	this.__obj.prototype[name] = [];
	// 	this._generate_set_get(name, get, set);
	// 	return this;
	// }

	// ClassBuilder.prototype.object = function (name, get, set) {
	// 	this.__obj.prototype[name] = {};
	// 	this._generate_set_get(name, get, set);
	// 	return this;
	// }

	// ClassBuilder.prototype.function = function(name, func) {
	// 	this.__obj.prototype[name] = func;
	// 	return this;
	// }
	
	ClassBuilder.prototype._generate_set_get = function (name, get, set) {
		if (get || set) {
			var namemix = name[0].toUpperCase() + name.substring(1);
			if (get)
				this.__obj.prototype['get'+namemix] = Function('return this.'+name);
			if (set)
				this.__obj.prototype['set'+namemix] = Function ('value', 'this.'+name+'=value;');
		}
	}

	ClassBuilder.prototype._generate = function () {
		if (this.__extends_obj != undefined && this.__extends_obj.prototype != undefined) {
			this.__obj.prototype = Object.create(this.__extends_obj.prototype);
		}
		if (this.__objbuild.attributes)
			this._attributes(this.__objbuild.attributes);
		if (this.__objbuild.functions)
			this._functions(this.__objbuild.functions);
		if (this.__extends_obj != undefined) {
			this.__obj.prototype['$'+this.__extends_name] = this.__extends_obj;
			for (var propname in this.__extends_obj.prototype) {
				if (!this.__obj.prototype[propname])
					this.__obj.prototype[propname] = this.__extends_obj.prototype[propname];
				else
					this.__obj.prototype['$'+this.__extends_name+'_'+propname] = this.__extends_obj.prototype[propname];
			}
		}

		return Function('obj', 'return obj');
	}

	ClassBuilder.prototype.build = function() {
		return this._generate()(this.__obj);
	}

	return function (obj) { return new ClassBuilder(obj) };
})();
