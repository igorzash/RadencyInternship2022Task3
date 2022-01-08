const { string } = require("yup");
const { object } = require("yup");
const categorySchema = require("./categorySchema");

const noteCreateSchema = object({
	contents: string().required(),
	category: categorySchema.required(),
});

module.exports = {
	noteCreateSchema,
};
