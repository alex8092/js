var htmlentity = Class(function (name, parent) {
	this._parent = parent;
	this._pattern += '<'+name;
	this._name = name;
	this._subs = [];
	this._attrs = {};
})
	.object('_attr')
	.object('_parent')
	.string('_text')
	.string('_name')
	.string('_pattern')
	.array('_subs')
	.function('add', function (name) {
		var obj = new htmlentity(name, this);
		this._subs.push(obj);
		return obj;
	})
	.function('attr', function (name, value) {
		this._attrs[name] = value;
		return this;
	})
	.function('text', function (value) {
		this._text = value;
		return this;
	})
	.function('end', function () {
		return this._parent;
	})
	.function('generate', function () {
		for (var i in this._attrs) {
			this._pattern += ' '+i+'="'+this._attrs[i]+'"';
		}
		this._pattern += '>';
		if (this._text)
			this._pattern += this._text;
		for (var i = 0; i < this._subs.length; ++i) {
			this._pattern += this._subs[i].generate();
		}
		return this._pattern+'</'+this._name+'>';
	})
	.build()