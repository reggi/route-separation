module.exports = function(app,routes){
  
  app.get('/', routes.main.index);
  app.get('/mike', routes.main.mike);
  app.get('/dave', routes.main.dave);
  app.get('/harry', routes.main.harry);
  app.get('/users', routes.users.index);

}