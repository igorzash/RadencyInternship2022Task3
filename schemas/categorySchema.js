const { string } = require("yup");
const { CATEGORY } = require("../category");

const categorySchema = string().oneOf(Object.values(CATEGORY));

module.exports = categorySchema;
