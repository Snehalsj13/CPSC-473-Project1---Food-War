(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var DETAIL_IMAGE_SELECTOR = "[data-image-role='displayImage']";
  var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";

  var imageArray = [];

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSignUpHandler = function(fn) {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    console.log("Setting signup handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var user = {};
      $(this).serializeArray().forEach(function(item) {
        user[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(user);
      fn(user);
    });
  };

  FormHandler.prototype.addSignInHandler = function(fn) {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    console.log("Setting register handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var user = {};
      $(this).serializeArray().forEach(function(item) {
        user[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(user);
      fn(user);
    });
  };

  FormHandler.prototype.addCommentHandler = function(fn) {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    console.log("Setting comment handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();
      var comment = {};
      $(this).serializeArray().forEach(function(item) {
        comment[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      if(window.user){
        comment.username = window.user.displayName;
      }else{
        comment.username = "anonymous";
      }
      console.log(comment);
      fn(comment);
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
