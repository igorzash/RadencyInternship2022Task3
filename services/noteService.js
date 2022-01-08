const { noteRepository } = require("../repositories/noteRepository");

class NoteService {
	constructor(repository) {
		this.repository = repository;
	}

	createNote(contents, category) {
		this.repository.createNote(contents, category);
	}

	getNote(id) {
		return this.repository.getNote(id);
	}

	getAllNotes() {
		return this.repository.getAllNotes();
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
