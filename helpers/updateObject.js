function updateObject(obj) {
	for (var i = 1; i < arguments.length; i++) {
		for (var prop in arguments[i]) {
			var val = arguments[i][prop];
			if (typeof val == "object") update(obj[prop], val);
			else obj[prop] = val;
		}
	}

	return obj;
}

module.exports = {
	updateObject,
};
