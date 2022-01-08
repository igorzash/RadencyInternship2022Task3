var express = require("express");
const { errorResponse, validationError } = require("../helpers/errorResponse");
const { okResponse } = require("../helpers/okResponse");
const { noteCreateSchema } = require("../schemas/noteCreateSchema");
const { notePatchSchema } = require("../schemas/notePatchSchema");
const { noteService } = require("../services/noteService");
var router = express.Router();

router.get("/", (req, res) => {
	try {
		res.json(noteService.getAllNotes());
	} catch (e) {
		errorResponse(res, e);
	}
});

router.get("/:id", (req, res) => {
	try {
		res.json(noteService.getNote(req.params.id));
	} catch (e) {
		errorResponse(res, e);
	}
});

router.delete("/:id", (req, res) => {
	try {
		noteService.getNote(req.params.id);
		noteService.deleteNote(req.params.id);

		okResponse(res);
	} catch (e) {
		errorResponse(res, e);
	}
});

router.post("/", (req, res) => {
	try {
		const data = req.body;

		noteCreateSchema
			.validate(data)
			.catch(() => {
				validationError(res);
			})
			.then(() => {
				noteService.createNote(data.contents, data.category);

				okResponse(res);
			})
			.catch((err) => errorResponse(res, err));
	} catch (e) {
		errorResponse(e);
	}
});

router.patch("/:id", (req, res) => {
	try {
		const data = req.body;

		notePatchSchema
			.validate(data)
			.catch(() => {
				validationError(res);
			})
			.then(() => {
				noteService.editNote(req.params.id, data);

				okResponse(res);
			})
			.catch((err) => errorResponse(res, err));
	} catch (e) {
		errorResponse(e);
	}
});

module.exports = router;
