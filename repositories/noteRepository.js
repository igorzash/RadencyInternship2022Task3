const { v4 } = require("uuid");
const { v4: uuid } = require("uuid");
const { CATEGORY } = require("../category");
const { updateObject } = require("../helpers/updateObject");
const { Note } = require("../models/Note");

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

const DAY = 24 * 60 * 60 * 1000;

function randomDate() {
	const date = new Date();
	date.setTime(date.getTime() - getRandomInt(5, 10) * DAY);
	return date;
}

class NoteRepository {
	notes = [
		new Note(v4(), "buy milk", CATEGORY.TASK, randomDate()),
		new Note(v4(), "buy gift", CATEGORY.TASK, randomDate()),
		new Note(
			v4(),
			"what if earth is flat",
			CATEGORY.RTHOUGHT,
			randomDate()
		),
		new Note(
			v4(),
			"meeting with coworker 5/5/2022",
			CATEGORY.TASK,
			randomDate()
		),
		new Note(
			v4(),
			"meeting with coworker 5/7/2022",
			CATEGORY.TASK,
			randomDate()
		),
		new Note(
			v4(),
			"resolve issue #4939 using X",
			CATEGORY.IDEA,
			randomDate()
		),
		new Note(
			v4(),
			"read 10 books 3/5/2022-4/6/2022",
			CATEGORY.TASK,
			randomDate()
		),
	];

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

module.exports = {
	noteRepository,
};
