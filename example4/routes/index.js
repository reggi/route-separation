module.exports = function(app){
  
  var routes = {};
  routes.main = require("./main.js");
  routes.users = require("./users.js");
  
  app.get('/', routes.main.index);
  app.get('/mike', routes.main.mike);
  app.get('/dave', routes.main.dave);
  app.get('/harry', routes.main.harry);
  app.get('/users', routes.users.index);

}