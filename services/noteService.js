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
}

module.exports = {
	noteService: new NoteService(noteRepository),
};
