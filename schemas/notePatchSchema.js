const { string, bool, object } = require("yup");
const categorySchema = require("./categorySchema");

const notePatchSchema = object({
	contents: string().optional(),
	category: categorySchema.optional(),
	archive: bool().optional(),
});

module.exports = {
	notePatchSchema,
};
