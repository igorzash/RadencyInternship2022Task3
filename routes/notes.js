var express = require("express");
const { noteService } = require("../services/noteService");
var router = express.Router();

router.get("/", (req, res) => {
	res.json(noteService.getAllNotes());
});

router.get("/:id", (req, res) => {
  console.log(req.params.id)
  try {
    res.json(noteService.getNote(req.params.id))
  } catch(e) {
    res.json({
      'error': true,
      'message': 'Failure finding note with specified id'
    })
  }
});

module.exports = router;
