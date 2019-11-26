import React, { Component } from 'react';
import './JMap.css'

class JMap extends Component {
    componentDidMount(){
        var sydney = new window.google.maps.LatLng(-12.070318, -77.07793);
        console.log("var sydney = new google.maps.LatLng(-33.867, 151.195);",sydney);
        var infowindow = new window.google.maps.InfoWindow();
        console.log("var infowindow = new window.google.maps.InfoWindow();",infowindow);
        var map_var = document.getElementById('map');
        console.log("var infowindow = new window.google.maps.InfoWindow();",map_var);
        var MAP = new window.google.maps.Map(map_var,
            {center: sydney, zoom: 18}
            );
        var request = {
            query: 'Pontificia Universidad Catolica del Peru',
            fields: ['name', 'geometry'],
            };
        var service = new window.google.maps.places.PlacesService(MAP);

        service.findPlaceFromQuery(request, function(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                window.createMarker(results[i]);
              }
      
              MAP.setCenter(results[0].geometry.location);
            }
          });

    }
    
    codeAddress(){
        console.log("JinSSJ2-> internal Code Address");
        var address = document.getElementById('address').value;
        console.log("JinSSJ2-> internal Address",address);
    }
    render(){
        console.log("JMap ****",this.props);
        return(
            
        <section >
            
        <div className="row">
        <div className="col-3">
        <br/>
                <div class="container full-width gmap-background">
                    
                    <div class="on-gmap color">
                        <h1 class="section-title">
                            <span data-animation="flipInY" data-animation-delay="100" class="icon-inner"><span class="fa-stack"><i class="fa rhex fa-stack-2x"></i><i class="fa fa-globe fa-stack-1x"></i></span></span>
                            <span data-animation="fadeInRight" data-animation-delay="100" class="title-inner">Ubicacion del Evento:</span>
                        </h1>
                        <p data-animation="fadeInUp" data-animation-delay="200" class="text-uppercase">PUCP‎ <br/>
                            Av. universitaria 1810, <br/>
                            Lima, Peru <br/>
                            +1 212-226-3126</p>
                        <p><a href="mailto:youremail@domain.com">a20122128@pucp.pe</a></p>
                        <a href="#" class="btn btn-theme"
                           data-animation="flipInY" data-animation-delay="300">Obtener Direccion <i class="fa fa-arrow-circle-right"></i></a>
                    </div>

                </div>
        </div>
        <div className="col-9">
        <script src= "./JMap.js"></script>
        <div id="map"></div>
         <script async defer 
         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFewU956fhTh3NC9lS0JKs8-TKxTCVvQ0&callback=componentWillMount"> </script>

        </div>
        </div>
        
        </section>
        );
    }
}
export default JMap;