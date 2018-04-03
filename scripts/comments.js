(function(window) {
  "use strict";
  var App = window.App || {};
  //var $ = window.jQuery;



function Comments(selector, db) {
    this.db=db;
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  Comments.prototype.addRow = function(comments) {
      // Create a new instance of a row
      var rowElement = new Row(comments);
      // Add the new row instance"s $element property to the checklist
      this.$element.append(rowElement.$element);
      this.db.add(comments.username, comments);
    };

  function Row(comment) {
    var $div = $("<div></div>", {
      "commentsList": "comments",
      "class": "checkbox"
    });

    var $label = $("<label></label>");

    var  description = comment.username+":" + comment.text;

    $label.append(description);
    $div.append($label);
    this.$element = $div;
  }

  App.Comments = Comments;
  window.App = App;
})(window);
