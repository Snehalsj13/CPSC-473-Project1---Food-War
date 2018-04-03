(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
    //this.serverUrl = url + "/comments";
    //this.fileUrl = url + "/upload";
    //this.getAll();
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
      //cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.addImage = function(key, file) {
    $.ajax(this.fileUrl, {
      type: "POST",
      contentType: "multipart/form-data",
      data: file
    });
  };

  // NOTE: GET key is the image file name for which the comments belong.
  RemoteDataStore.prototype.getAll = function(key, cb) {
    $.get(this.serverUrl + "?image=" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAllImages = function(cb) {
    dpd.fileupload.get(function(result, err) {
      console.log(result);
      cb(result);
    });
  };

  // NOTE: GET key is the unique id in the collection.
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  // NOTE: GET key is the image file name.
  RemoteDataStore.prototype.getImage = function(key, cb) {
    $.get(this.fileUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  // NOTE: DELETE key is the unique id in the collection.
  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + "/" + key, {
      type: "DELETE"
    });
  };

  // NOTE: DELETE key is the unique id of the file.
  RemoteDataStore.prototype.removeImage = function(key) {
    dpd.fileupload.del(key, function(result, err) {
      if (err) alert(err);
      console.log(result);
    });
  };

  RemoteDataStore.prototype.getByKey = function(key, val, cb) {
     $.get(this.serverUrl + "?" + key+"="+val, function(serverResponse) {
       console.log(serverResponse);
       cb(serverResponse);
     });
 };

 RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log("In getAll method:" + serverResponse);
      cb(serverResponse);
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
