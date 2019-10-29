import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/dash_style.css';
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import Portafolio from './Special/Portafolio';
import EventDetail from './EventDetail';
const Networking = require('./../Network/Networking.js') ;

/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        idUser_recived: 0,
       datos_tabla: {
                Eventos:[
                         ]
       }
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);

  }
  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }
  handleClickCrearActualizar = () => {
    console.log('redireccionando a ... EventDetail evento');
    
    
    this.handleNextChildComponentChange(EventDetail);
  }
  componentWillMount(){
      
      
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);  
    this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
    console.log(retrievedJson);


    Networking.populateDataOrgTab1(retrievedJson.infoUsuario.idUsuario).then((value) => {
       console.log(value);
       if(value == null){
          console.log('no hay algo aun');
          
       }else {
          console.log('si hay algo:');
          this.setState({datos_tabla:value});
       }
       
    });
 }
 shouldComponentUpdate(nextProps, nextState){
    if(this.state.datos_tabla != nextState.datos_tabla){
       return true;
    }
    return false;
 }

  render(){
    debugger;
    return (

        <div>
          <div class="container">
          
                                      
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
              
              
              <ol class="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>

            
            
              <div class="carousel-inner" role="listbox">
                <div class="item active">
                  <img src="http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png" alt="event1"/>
                  <div class="carousel-caption">
                    <h3>AWS Amazon Web Services DOOM2 $</h3>
                    <p>Money Money.</p>
                  </div>      
                </div>

                <div class="item">
                  <img src="https://s3.amazonaws.com/files.pucp.edu.pe/agenda/wp-content/uploads/2019/09/03143150/agendapucp-exhibicion_pasaporte-artista.jpg" alt="Image"/>
                  <div class="carousel-caption">
                    <h3>More Sell $</h3>
                    <p>Lorem ipsum...</p>
                  </div>      
                </div>

                <div class="item">
                  <img src="https://drupal.ed.team/sites/default/files/styles/16_9_medium/public/imagenes-cdn-edteam/2019-04/React%20desde%20cero%20%281%29.png" alt="Image"/>
                  <div class="carousel-caption">
                    <h3>React.py workshop $</h3>
                    <p>Lorem ipsum...</p>
                  </div>      
                </div>
              </div>



              <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
          </div></div>


            <div class="container text-left">   
            <div class="panel panel-default">
            <br/><h1>Proximos eventos:<br/><br/></h1>
            <h3>Eventos Proximos a Iniciar:</h3>
            <div class="row">
                <div class="col-sm-4">
                <img src="https://placehold.it/150x80?text=IMAGE" 
                class="img-responsive" alt="Image"/>
                <p>Current Project</p>
                </div>
                <div class="col-sm-4"> 
                <img src="https://placehold.it/150x80?text=IMAGE" 
                class="img-responsive"  alt="Image"/>
                <p>Project 2</p>    
                </div>
                <div class="col-sm-4">
                <div class="well">
                <p>Some text..</p>
                </div>
                <div class="well">
                <p>Some text..</p>
                </div>
                </div>
            </div>
            </div></div> 


        <Portafolio setEventos={this.state.datos_tabla} title="Eventos en convocatoria"/>
        </div>
        
    
    
 
        
    );
  }
}

export default Dashboard;


































