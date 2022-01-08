const { string } = require("yup");
const { CATEGORY } = require("../category");

const categorySchema = string().test((value) =>
	Object.values(CATEGORY).includes(value)
);

module.exports = categorySchema;
