module.exports = function(app) {

	app.get('/users', function(req,res) {
		res.send("users.js /users");
	});

	app.get('/users/:id', function(req,res) {
		res.send("users.js /users:id'");
	});

};