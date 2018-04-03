(function(window) {
  "use strict"
  var App = window.App;
  var FormHandler = App.FormHandler;

  var SERVER_URL = "http://localhost:2404/foodwars";

  var RemoteDataStore = App.RemoteDataStore;
  var remoteDS = new RemoteDataStore(SERVER_URL);


  var SERVER_URL_USER = "http://localhost:2403/users";
  var User = App.User;
  var $=window.jQuery;
  var remoteDSuser = new RemoteDataStore(SERVER_URL_USER);
  var userDetails = new User(remoteDSuser);
  var FORM_SIGNUP_SELECTOR = "[data-signup='form']";
  var signUpForm = new FormHandler(FORM_SIGNUP_SELECTOR);


  var FORM_SIGNIN_SELECTOR = "[data-signin='form']";
  var signInForm = new FormHandler(FORM_SIGNIN_SELECTOR);
  window.userDetails = userDetails;


  var FormHandler = App.FormHandler;
//  var formHandler = new FormHandler(FORM_SELECTOR_FOODWAR);

var SERVER_URL_Comments = "http://localhost:2403/comments";
var Comments = App.Comments;
var remoteDSComments = new RemoteDataStore(SERVER_URL_Comments);
//var newComment = new Comments(remoteDSComments);
var FORM_SELECTOR_COMMENT = "[comment-form='form']";
var commentForm = new FormHandler(FORM_SELECTOR_COMMENT);
var COMMENTLIST_SELECTOR = "[data-comments-section='commentList']";
var commentList = new Comments(COMMENTLIST_SELECTOR,remoteDSComments);

 window.remoteDS = remoteDS;

signUpForm.addSignUpHandler.call(signUpForm, function(user){
  userDetails.register.call(userDetails, user);
  console.log(user);
  window.user = user;
  if(user){
    $("#welcome").text("Hello " + user.displayName);
    $("#login").hide();
    $("#signUp").hide();
    $("#id01").hide();
    $("#logout").show();
  }
});

signInForm.addSignInHandler.call(signInForm, function(user){
  userDetails.authenticate.call(userDetails, user, function(serverResponse){
    console.log(serverResponse);
    if(serverResponse[0]){
      window.user = serverResponse[0];
      $("#welcome").text("Hello " + serverResponse[0].displayName);
      $("#login").hide();
      $("#signUp").hide();
      $("#id02").hide();
      $("#logout").show();
    }else{
      $("#welcome").text("Invalid username or password. Please try again!! " );
      $("#login").hide();
      $("#signUp").hide();
      $("#id02").hide();
    }
  });
});



commentForm.addCommentHandler.call(commentForm,  function(comment) {
    commentList.addRow.call(commentList, comment);
    //commentList.saveComment.call(comment);
  });

})(window);
