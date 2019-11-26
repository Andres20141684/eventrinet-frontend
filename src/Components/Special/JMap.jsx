import React, { Component } from 'react';
import './JMap.css'


class JMap extends Component {
    constructor(props){
        super(props);
        this.state={
            map:null,
            service:null,
            infowindow:null,
        }
        this.createMarker=this.createMarker.bind(this);

    }
    createMarker(place) {
        
      }
    componentDidMount(){
        

      
        var sydney = new window.google.maps.LatLng(-33.867, 151.195);
        console.log("window.google.maps.LatLng: ",sydney);
        var _infowindow = new window.google.maps.InfoWindow();
        this.setState({infowindow : _infowindow});
        
        console.log("_infowindow: ",_infowindow);
        var _map = new window.google.maps.Map(
            document.getElementById('map'), {center: sydney, zoom: 18})
        this.setState({map : _map});
        console.log("_map: ",_map);


        var request = {
          query: 'PUCP lima Peru',
          fields: ['name', 'geometry'],
        };
        console.log("request: ",request);
        var _sevice =new window.google.maps.places.PlacesService(_map);
        this.setState({service :_sevice});
        console.log("_sevice: ",_sevice);

        _sevice.findPlaceFromQuery(request, function(results, status) {
            console.log("Results: ",results);
            console.log("status: ",status);
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              let place =results[i];
              console.log("place: ",place);
              var marker = new window.google.maps.Marker({
                map: _map,
                position: place.geometry.location
              });
      
              window.google.maps.event.addListener(marker, 'click', function() {
                  _infowindow.setContent(place.name);
                  _infowindow.open(_map, this);
              });
            }

            _map.setCenter(results[0].geometry.location);
          }
        });
      

      

        window.google.maps.event.addListener(_map, 'click', function(event) {
            console.log("JINSSJ2 MAP Evento de clic ->",event);
            var marker = new window.google.maps.Marker({
                map: _map,
                position: event.latLng
              });
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
        <div id="map"></div>
        </div>
        </div>
        
        </section>
        );
    }
}
export default JMap;