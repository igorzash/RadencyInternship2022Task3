function okResponse(res) {
	res.json({
		error: false,
	});
}

module.exports = {
	okResponse,
};
