const { v4: uuid } = require("uuid");
const { Note } = require("../models/Note");

class NoteRepository {
	notes = [];

	createNote(contents, category) {
		this.notes.push(new Note(uuid(), contents, category));
	}

	deleteNote(id) {
		this.notes = this.notes.filter((note) => note.id != id);
	}

	getAllNotes() {
		console.log(this.notes);
		return this.notes;
	}

	getNote(id) {
		const note = this.notes.filter((note) => note.id === id)[0];

		if (!note) {
			throw new Error('No note with such id.');
		}

		return note;
	}

	editNote(id, patch) {
		this.notes.map((note) => {
			if (note.id === id) {
				note = Object.assign(note, patch);
			}

			return note;
		});
	}
}

const noteRepository = new NoteRepository();

noteRepository.createNote('buy milk', 'Task');

module.exports = {
	noteRepository
};
