var Class = (function generate() {
	var ClassBuilder = function (obj) {
		this.__obj = obj;
		this.__extends_name = '';
		this.__extends_obj = {};
		this.__properties
	}

	ClassBuilder.prototype.extend = function (name, classobject) {
		this.__extends_name = name;
		this.__extends_obj = classobject;
		return this;
	}

	ClassBuilder.prototype.number = function (name, get, set) {
		this.__obj.prototype[name] = 0;
		if (get || set) {
			var namemix = name[0].toUpperCase() + name.substring(1);
			if (get)
				this.__obj.prototype['get'+namemix] = Function('return this.'+name);
			if (set)
				this.__obj.prototype['set'+namemix] = Function ('value', 'this.'+name+'=value;');
		}
		return this;
	}

	ClassBuilder.prototype.string = function (name) {
		this.__obj.prototype[name] = '';
		return this;
	}

	ClassBuilder.prototype.array = function (name) {
		this.__obj.prototype[name] = [];
		return this;
	}

	ClassBuilder.prototype.object = function (name) {
		this.__obj.prototype[name] = {};
		return this;
	}

	ClassBuilder.prototype.function = function(name, func) {
		this.__obj.prototype[name] = func;
		return this;
	}

	ClassBuilder.prototype._generate = function () {
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