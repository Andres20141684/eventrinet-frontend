import React, { Component } from 'react';
import './JMap.css'


class JMap extends Component {
    constructor(props){
        super(props);
        this.state={
            map:null,
            service:null,
            infowindow:null,
            lugar: "MIT",
        }
        this.createMarker=this.createMarker.bind(this);

    }
    createMarker(place) {
        
      }
      shouldComponentUpdate(nextProps,nextState){
        if(nextState.lugar != this.state.lugar){
          return true;
        }
        if(nextProps.lugar != this.props.lugar){
          return true;
        }
        return false;
      }
      componentWillMount(){
        console.log("JMAP-> lugar state", this.state.lugar);
        console.log("JMAP-> lugar props", this.props.lugar);
        var newLugar= this.props.lugar || this.setState.lugar;
        this.setState({lugar: newLugar});
        console.log("JMAP-> lugar stateProps", this.state.lugar);
      }
    componentDidMount(){

      if(this.props.mode === "event_creation"){
        document.getElementById("pac-card_vista").style.display="none";
          //muestro todo hasta el auocompleter
          var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13
          });
          var card = document.getElementById('pac-card');
          var input = document.getElementById('pac-input');
          
    
          map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
    
          var autocomplete = new window.google.maps.places.Autocomplete(input);
    
          // Bind the map's bounds (viewport) property to the autocomplete object,
          // so that the autocomplete requests use the current map bounds for the
          // bounds option in the request.
          autocomplete.bindTo('bounds', map);
    
          // Set the data fields to return when the user selects a place.
          autocomplete.setFields(
              ['address_components', 'geometry', 'icon', 'name']);
    
          var infowindow = new window.google.maps.InfoWindow();
          var infowindowContent = document.getElementById('infowindow-content');
          infowindow.setContent(infowindowContent);
          var marker = new window.google.maps.Marker({
            map: map,
            anchorPoint: new window.google.maps.Point(0, -29)
          });
          var host = this;
          ///////////////////////////////////////////////////////////////////////
         
          /////////////////////////////////////////////////////////////////////////
          autocomplete.addListener('place_changed', function() {

            console.log("*******************************autocomplete es ", autocomplete);
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            
            //this.props.onChange({target:{value:place,name:"lugar"}});
            if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              //window.alert("No details available for input: '" + place.name + "'");
              return;
            }
    
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(19);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
    
            var address = '';
            if (place.address_components) {
              address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');
              
            }
    
            infowindowContent.children['place-icon'].src = place.icon;
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-address'].textContent = address;
            //window.alert("CHANGED: '" + address + "'");
            host.props.onChange({target:{value:""+place.name+","+address,name:"lugar"}});
            infowindow.open(map, marker);

          });

          
      
          return;
      }

      /******************************************* */

      if(this.props.mode === "event_visualization"){
        document.getElementById("pac-card_seach").style.display="none";
        //solo muestro el marker en la posicion XDXD
        var sydney = new window.google.maps.LatLng(-33.867, 151.195);
        console.log("window.google.maps.LatLng: ",sydney);
        var _infowindow = new window.google.maps.InfoWindow();
        this.setState({infowindow : _infowindow});
        
        console.log("_infowindow: ",_infowindow);
        var _map = new window.google.maps.Map(
            document.getElementById('map'), {center: sydney, zoom: 18})
        this.setState({map : _map});
        console.log("_map: ",_map);

        try{
          
          
          var request = {
          query: this.state.lugar,
          //query: 'PUCP lima Peru',
          
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
        
      }catch(e){
        console.error("EL MAPA NO ENCUENTRA UNDEFINED CTM");
      }
        
      }
      return;


    }
    
    codeAddress(){
        console.log("JinSSJ2-> internal Code Address");
        var address = document.getElementById('address').value;
        console.log("JinSSJ2-> internal Address",address);
    }
    render(){
        console.log("JMap ****",this.props);
        return(
            
       <>
       

       <div class="pac-card" id="pac-card_vista">
      <div style={{paddingBottom: "5px"}}>
        <div id="search_title">
          Escribe la dirección:
        </div>
      </div>
      <div id="pac-container">
        <input id="pac-input" type="text" className="form-control" 
            placeholder="Escribe una dirección"
            readOnly={true} value={this.props.lugar}/>
      </div>
    </div> 
    <div class="pac-card" id="pac-card_seach">
      <div style={{paddingBottom: "5px"}}>
        <div id="search_title">
          Escribe la dirección:
        </div>
      </div>
      <div id="pac-container">
        <input id="pac-input" type="text" className="form-control" 
            placeholder="Escribe una dirección"/>
      </div>
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
      <img src="" width="16" height="16" id="place-icon"/>
      
      <span id="place-name"  class="search_title"></span><br/>
      <span id="place-address"></span>
    </div>
       
       </>
        );
    }
}
export default JMap;



/**
 * 
 * 

<div className="row">
        <div className="col-3">
        <br/>
                <div class="container full-width gmap-background">
                    
                    <div class="on-gmap color">
                        <h1 class="section-search_title">
                            <span data-animation="flipInY" data-animation-delay="100" class="icon-inner"><span class="fa-stack"><i class="fa rhex fa-stack-2x"></i><i class="fa fa-globe fa-stack-1x"></i></span></span>
                            <span data-animation="fadeInRight" data-animation-delay="100" class="search_title-inner">Ubicacion del Evento:</span>
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
        
        </div>
        </div>






 */
//        COMPONENT DID MOUNT
 
 
 
      /*
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
          query: this.props.lugar,
          //query: 'PUCP lima Peru',
          
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
 
 
 */