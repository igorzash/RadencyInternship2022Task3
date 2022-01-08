const { CATEGORY } = require("../category");
const { noteRepository } = require("../repositories/noteRepository");

class NoteService {
	constructor(repository) {
		this.repository = repository;
	}

	createNote(contents, category) {
		this.repository.createNote(contents, category);
	}

	_parse_dates(note) {
		note.dates = note.contents.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];

		return note;
	}

	getNote(id) {
		return this._parse_dates(this.repository.getNote(id));
	}

	getAllNotes() {
		return this.repository.getAllNotes().map(this._parse_dates);
	}

	deleteNote(id) {
		this.repository.deleteNote(id);
	}

	editNote(id, patch) {
		this.repository.editNote(id, patch);
	}

	getStats() {
		const categories = Object.values(CATEGORY);

		return categories
			.map((cat) =>
				Array.from(this.repository.getAllNotes()).filter(
					(n) => n.category === cat
				)
			)
			.map((n, i) => ({
				category: categories[i],
				active: n.filter((n) => !n.archived).length,
				archived: n.filter((n) => n.archived).length,
			}));
	}
}

module.exports = {
	noteService: new NoteService(noteRepository),
};
