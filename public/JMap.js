var geocoder;
var map;
var marker;
var service;
var infowindow;

function initMap() {
    var sydney = new google.maps.LatLng(-12.070318, -77.07793);
    console.log("var sydney = new google.maps.LatLng(-33.867, 151.195);");
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(
        document.getElementById('map'), {center: sydney, zoom: 18});

    var request = {
      query: 'Pontificia Universidad Catolica del Peru',
      fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

/*function initMap() {
    // The location of Uluru
    
    geocoder = new google.maps.Geocoder();
    console.log("JinSSJ2-> geocoder",geocoder);
    console.log("JINSSJ2-> initializing MAP");
    var EEGGCC = {lat: -12.070318, lng: -77.07793};
    console.log("JINSSJ2-> initializing MAP: var uluru = {lat: -25.344, lng: 131.036};");
    // The map, centered at Uluru
     map = new google.maps.Map(
        document.getElementById('map'), {zoom: 21, center: EEGGCC});
    // The marker, positioned at Uluru
     marker = new google.maps.Marker({position: EEGGCC, map: map});
     console.log("JinSSJ2-> map",map);
     console.log("JinSSJ2-> marker",marker);
    }
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }*/

