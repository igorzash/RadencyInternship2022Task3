const { v4: uuid } = require("uuid");
const { updateObject } = require("../helpers/updateObject");
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
		return this.notes;
	}

	getNote(id) {
		const note = this.notes.filter((note) => note.id === id)[0];

		if (!note) {
			throw new Error("No note with such id.");
		}

		return note;
	}

	editNote(id, patch) {
		let found = false;

		this.notes = this.notes.map((note) => {
			if (note.id === id) {
				updateObject(note, patch);
				found = true;
			}

			return note;
		});

		if (!found) throw new Error("No note with such id.");
	}
}

const noteRepository = new NoteRepository();

noteRepository.createNote("buy milk", "Task");

module.exports = {
	noteRepository,
};
