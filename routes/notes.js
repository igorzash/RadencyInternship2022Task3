var express = require("express");
const { okResponse } = require("../helpers/okResponse");
const { noteCreateSchema } = require("../schemas/noteCreateSchema");
const { notePatchSchema } = require("../schemas/notePatchSchema");
const { noteService } = require("../services/noteService");
var router = express.Router();

router.get("/", (req, res, next) => {
	try {
		res.json(noteService.getAllNotes());
	} catch (e) {
		next(e);
	}
});

router.get("/stats", (req, res, next) => {
	try {
		res.json(noteService.getStats());
	} catch (e) {
		next(e);
	}
});

router.get("/:id", (req, res, next) => {
	try {
		res.json(noteService.getNote(req.params.id));
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", (req, res, next) => {
	try {
		noteService.getNote(req.params.id);
		noteService.deleteNote(req.params.id);

		okResponse(res);
	} catch (e) {
		next(e);
	}
});

router.post("/", (req, res, next) => {
	return noteCreateSchema
		.validate(req.body)
		.then(() => {
			console.log(req.body)
			noteService.createNote(req.body.contents, req.body.category);
			okResponse(res);
		})
		.catch(next);
});

router.patch("/:id", (req, res, next) => {
	return notePatchSchema
		.validate(req.body)
		.then(() => {
			noteService.editNote(req.params.id, req.body);
			okResponse(res);
		})
		.catch(next);
});

module.exports = router;
