class Note {
	archived = false;

	constructor(id, contents, category) {
        this.id = id;
		this.contents = contents;
		this.category = category;
		this.date = new Date();
	}
}

module.exports = {
	Note,
};
