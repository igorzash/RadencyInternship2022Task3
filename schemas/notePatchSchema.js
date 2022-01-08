const { string, bool, object } = require("yup");
const categorySchema = require("./categorySchema");

const notePatchSchema = object({
	contents: string().notRequired(),
	category: categorySchema.notRequired(),
	archive: bool().notRequired(),
});

module.exports = {
	notePatchSchema,
};
