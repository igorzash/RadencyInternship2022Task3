var express = require("express");
const { noteCreateSchema } = require("../schemas/noteCreateSchema");
const { noteService } = require("../services/noteService");
var router = express.Router();

router.get("/", (req, res) => {
	try {
		res.json(noteService.getAllNotes());
	} catch (e) {
		res.json({
			error: true,
			message: e,
		});
	}
});

router.get("/:id", (req, res) => {
	try {
		res.json(noteService.getNote(req.params.id));
	} catch (e) {
		res.json({
			error: true,
			message: e,
		});
	}
});

router.delete("/:id", (req, res) => {
	try {
		noteService.getNote(req.params.id);
		noteService.deleteNote(req.params.id);

		res.json({
			error: false,
		});
	} catch (e) {
		res.json({
			error: true,
			message: e,
		});
	}
});

router.post("/", (req, res) => {
	try {
		const data = req.body;

		noteCreateSchema.validate(data).then(() => {
			noteService.createNote(data.contents, data.category);

			res.json({
				error: false,
			});
		}).catch(() => {
			res.json({
				error: true,
				message: 'Validation error'
			})
		});
	} catch (e) {
		res.json({
			error: true,
			message: e,
		});
	}
});

module.exports = router;
