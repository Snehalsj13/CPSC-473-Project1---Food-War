var imageArray = [];
var DETAIL_IMAGE_SELECTOR = "[data-image-role='displayImage']";

function getRemoteData(){
  /*window.remoteDS.getAllImages(function(data) {
    for (var i = 0; i < data.length; i++) {
      imageArray[i] = data[i];
    }
  });*/
  imageArray[0]="img/Spaghetti.jpg";
  imageArray[1]="img/Taco.jpg";
  imageArray[2]="img/Breakfast.jpg";
  imageArray[3]="img/Hamburger.jpg";
  imageArray[4]="img/Ramen.jpg";

  return imageArray;
}

function setDetails(imageElement) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  //var imageElement = document.createElement('img');
  //imageElement.setAttribute('src', imageArray[image]);
  detailImage.setAttribute("src", imageElement);
}

function getCurrentImageIndex() {
  imageArray = getRemoteData();
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  for (var i = 0; i < imageArray.length; i++) {
    if (imageArray[i] == detailImage.getAttribute("src")) {
      return i;
    }
  }
  return -1;
}

function next() {
  imageArray = getRemoteData();
  var nextImage = (getCurrentImageIndex() + 1) % imageArray.length;
  setDetails(imageArray[nextImage]);
}

function previous() {
  imageArray = getRemoteData();
  var prevImage = (getCurrentImageIndex() - 1 + imageArray.length) % imageArray.length;
  setDetails(imageArray[prevImage]);
}
