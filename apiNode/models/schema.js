const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ms = mongoose.Schema;

const TodoSchema = new ms({
		nome: {
			type: String,
			required: true,
		},
		cpf: {
			type: String,
			required: true,
		},
	},
	{ minimize: false },
);

TodoSchema.plugin(timestamps);
TodoSchema.plugin(mongooseStringQuery);

const Schema = mongoose.model('Schema', TodoSchema);
module.exports = Schema;    