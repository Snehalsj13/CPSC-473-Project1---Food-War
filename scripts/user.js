(function(window) {
  "use strict";
  var App = window.App || {};
  //var $ = window.jQuery;

function User(db){
  this.db=db;
}

User.prototype.register=function(user){
  this.db.add(user.username,user);
}

User.prototype.authenticate=function(user, cb){
  this.db.getByKey("username",user.username, function(serverResponse){
    console.log(serverResponse);
    cb(serverResponse);
  });

}

  App.User = User;
  window.App = App;
})(window);
