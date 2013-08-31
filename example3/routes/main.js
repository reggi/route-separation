exports.index = function(req,res){
  res.send("This is the index from the main.js route");
}

exports.mike = function(req,res){
  res.send("Mike - from the main.js route");
}

exports.dave = function(req,res){
  res.send("Dave - from the main.js route");
}

exports.harry = function(req,res){
  res.send("Harry - from the main.js route");
}