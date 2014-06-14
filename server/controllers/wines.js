var Wine = require('../models/wines');
var LinkedIn = require('../models/linkedin');

exports.findAll = function(req, res) {
        var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			var conditions = {};
			if (req.query.winery) {
				conditions.winery = req.query.winery;
			}

			Wine.find(conditions, function(err, wines) {
				if (!err) {
					res.send(wines);
				} else {
					res.statusCode = 500;
					res.send('');
				}
			});
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('');
        	}
	);
};
 
exports.findById = function(req, res) {
        var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			var _id = req.params._id;
			Wine.findById(_id, function(err, wine) {
				if (!err) {
					if (wine) {	
						res.send(wine);
					} else {
						res.statusCode = 404;
						res.send('');
					}
				} else {
					res.statusCode = 500;
					res.send('');
				}
			});
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('');
        	}
	);
};

exports.delete = function(req, res) {
        var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			var _id = req.params._id;
			Wine.findByIdAndRemove(_id, function(err, wine) {
				if (!err) {
					if (wine) {	
						res.send(wine);
					} else {
						res.statusCode = 404;
						res.send('');
					}
				} else {
					res.statusCode = 500;
					res.send('');
				}
			});
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('');
        	}
	);
}

 
exports.add = function(req, res) {
        var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS	
			if (req.is('application/json')) {
				var wine = new Wine({name: req.body.name, winery: req.body.winery});		
				wine.save(function(err) {
					if (!err) {
						res.send(wine);
					} else {
						res.statusCode = 400;
						res.send(err);
					}		
				});
			} else {
				res.statusCode = 415;
				res.send('');
			}
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('');
        	}
	);
}
 
exports.update = function(req, res) {
        var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			if (req.is('application/json')) {
				var _id = req.params._id;
				Wine.findById(_id, function(err, wine) {
					if (!err) {
						if (wine) {	
							wine.name = req.body.name;
							wine.winery = req.body.winery;
							wine.save(function(err) {
								if (!err) {
									res.send(wine);
								} else {
									res.statusCode = 400;
									res.send(err);
								}		
							});
						} else {
							res.statusCode = 404;
							res.send('');
						}
					} else {
						res.statusCode = 500;
						res.send('');
					}
				});
			} else {
				res.statusCode = 415;
				res.send('');
			}
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('');
        	}
	);
}
