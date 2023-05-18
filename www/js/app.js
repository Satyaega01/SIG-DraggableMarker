var $ = Dom7;

var app = new Framework7({
  name: "SIG - Draggable Marker", // App name
  theme: "auto", // Automatic theme detection

  el: "#app", // App root element

  // App store
  store: store,
  // App routes
  routes: routes,
});

function initialize() {
  var myLatlng = new google.maps.LatLng(-8.7467357, 115.1668024);
  var mapOptions = {
    zoom: 9,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Uluru (Ayers Rock)",
    draggable: true,
  });

  lat = marker.getPosition().lat();
  lng = marker.getPosition().lng();

  var contentString = '<div id="content">' + '<div id="siteNotice">' + "</div>" + '<h4 id="firstHeading" class="firstHeading">' + lat + "</br>" + lng + "</h4>" + "</div>" + "</div>";

  google.maps.event.addListener(marker, "dragend", function (evt) {
    document.getElementById("firstHeading").innerHTML = +evt.latLng.lat() + "</br>" + evt.latLng.lng();
  });

  google.maps.event.addListener(marker, "dragstart", function (evt) {
    document.getElementById("firstHeading").innerHTML = "Dragging...";
  });

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker), (document.getElementById("firstHeading").innerHTML = "Ini adalah Marker");
  });
}

google.maps.event.addDomListener(window, "load", initialize);
