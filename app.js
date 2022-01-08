var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

var notesRouter = require("./routes/notes");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/notes", notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		error: true,
		message: err.message,
	});
});

module.exports = app;
