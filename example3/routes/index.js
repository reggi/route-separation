var fs = require('fs');

module.exports = function(app) {
  fs.readdir(__dirname+"/", function (err, filenames) {
    var routes = {};
    for(var key in filenames){
      var value = filenames[key];
      if(value !== "index.js" && value !== "switchboard.js" && value.substr(value.lastIndexOf('.') + 1) == 'js'){
        routes[value.substr(0, value.indexOf('.'))] = require('./'+value);
      }
    }
    require('./switchboard.js')(app,routes);
  });
}