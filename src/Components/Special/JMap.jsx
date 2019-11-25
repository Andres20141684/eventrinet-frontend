import React, { Component } from 'react';
import './JMap.css'

class JMap extends Component {
    componentDidMount() {
        
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
                
        </div>
        </div>
        
        </section>
        );
    }
}
export default JMap;