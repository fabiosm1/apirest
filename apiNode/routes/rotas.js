/*Module Dependencies*/
const errors = require('restify-errors');

/*Model Schema */
const Schema = require('../models/schema');
module.exports = function(server) {

	//POST
	server.post('/create', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}

		let data = req.body || {};

		let schema = new Schema(data);
		schema.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.send(201);
			next();
		});
	});

	//GET ALL
	server.get('/', (req, res, next) => {
		Schema.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}
			res.send(docs);
			next();
		});
	});

	//GET
	server.get('/:cpf', (req, res, next) => {
		Schema.findOne({ cpf: req.params.cpf }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(doc);
			next();
		});
	});

	//UPDATE
	server.put('/update/cpf', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}

		let data = req.body || {};

		if (!data.cpf) {
			data = Object.assign({}, data, { cpf: req.params.cpf });
		}

		Schema.findOne({ cpf: req.params.cpf }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.',
					),
				);
			}

			Schema.update({ cpf: data.cpf }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

	//DELETE

	server.del('/delete/cpf', (req, res, next) => {
		Schema.remove({ cpf: req.params.cpf }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(204);
			next();
		});
	});
};    