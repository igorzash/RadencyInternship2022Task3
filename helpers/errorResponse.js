function errorResponse(res, message) {
	res.json({
		error: true,
		message: message.toString(),
	});
}

function validationError(res) {
	errorResponse(res, "Validation error");
}

module.exports = {
	errorResponse,
	validationError,
};
