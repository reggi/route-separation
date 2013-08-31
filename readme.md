### Express.js Routing Separation

#### Forward

Normal routes in express are in `app.js` like so `app.get('/', routes.index);`. The default setup for express routes can be very cumbersome, the larger your app gets the larger your `app.js` is going to get, making it harder to read and maintain. 

#### Resources

[Visionmedia's](https://github.com/visionmedia) example for [route-seporation](https://github.com/visionmedia/express/tree/master/examples/route-separation) isn't the greatest (isn't totally clear). [Dailyjs](http://dailyjs.com/) has a good article on modules and it gives the example of [route-seporation](http://dailyjs.com/2012/01/26/effective-node-modules/) but it isn't very clear.

There are a ton of stack overflow posts on this subject.

* [How to include route handlers in multiple files in Express](http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express)
* [Node.js: Configuration and routes in a different file](http://stackoverflow.com/questions/8438998/node-js-configuration-and-routes-in-a-different-file)
* [Node.js & Express.js: Breaking up the app.js file](http://stackoverflow.com/questions/7732293/node-js-express-js-breaking-up-the-app-js-file)
* [Nodejs/Expressjs app structure](http://stackoverflow.com/questions/8428212/nodejs-expressjs-app-structure)


#### Examples

Each directory in this repository is an express app that demonstrates the express routes in a separated way. All the apps were created `||` tested with `express --version` 3.0.0rc3. Each app is using a different port number for example, `examplel1` uses `3001`, `example2` uses `3002`.

##### _example1_

Within `apps.js` all of the routes are replaced with `require('./routes')(app);` which fires `/routes/index.js` by default. From within `/routes/index.js` we export a module requiring all of the other files in the directory manually like so `require('./users')(app);` passing the `app` variable down to each level. Finally each `/route` file can be wrapped in a `module.exports` in which we can run `app.get`, `app.post`, etc., that's all their is to this method. Attribution [ShadowCloud](http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express#answer-6059938), [Alex Young](http://dailyjs.com/2012/01/26/effective-node-modules/).

#### _example2_

This is very similar to `example1` the only difference is that `/routes/index.js` is automatically adding every file in the `/routes` directory. Attribution [Sam Corder](http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express#answer-6064205), [Brad Proctor](http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express#answer-11923719).

#### _example3_

I personally created this method out of desire. The goals that I used as a framework where as follows:

1. Remove all `http` calls like `app.get()` from `apps.js`.
2. Automatically load each of the route files in `/routes` to the `routes` object. For example a file like `/routes/dog.js` and its export of `exports.index()` would be accessible from `routes.dog.index`.
3. Include all `http` calls like `app.get()` in one file without any logic. Meaning I didn't want things like:

		module.exports = function(app) {	
			app.get('/', function(req,res) {
				res.send("/");
			});
		};
or even like

		app.get('/', function(req,res) {
			res.send("/");
		});
all calls should look like

		  app.get('/', routes.main.index);
		  app.get('/mike', routes.main.mike);
		  app.get('/dave', routes.main.dave);
		  app.get('/harry', routes.main.harry);
		  app.get('/users', routes.users.index);
This shows the route definition `/` or `/mike` to be separated from the function being executed. I wanted all of the routes to use the `route` object. I call the file that contains these declarations the `/routes/switchboard.js`.


The `routes/index.js` file loads all of the JavaScript files in the `/routes` directory except `index.js` and `switchboard.js`. When everything is loaded with `rs.readdir()` and validated I require each of the route files into the `routes` object then load `switchboard.js`. With this configuration the route files don't have any interaction with the `app` variable and there are no `module.exports` in the route level it is all `exports`. I am new to `async` and if you see a performance gap I would love to learn what is wrong with this method. Attribution [Reggi](https://github.com/reggi).

#### _example4_

This is a much, much simpler version of the last example. The main difference is that I ditched `rs.readdir()` automatically generating the `routes` object which is very clunky and I create it "manually" inside the new `/routes/index.js` file right above to the `app.get()` declarations. I figured that you can't really use a new `route` unless you define it's `GET` or `POST` properties manually anyway, so we might as well include the files the the `route` object manually. 
