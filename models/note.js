class Note {
	archived = false;

	constructor(id, contents, category, date) {
		this.id = id;
		this.contents = contents;
		this.category = category;
		this.date = date || new Date();
	}
}

module.exports = {
	Note,
};
