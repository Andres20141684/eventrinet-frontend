import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/InscriptionEvent.css'
import FormSendProposal from './FormSendProposal';

const Networking = require('../Network/Networking.js') ;


class SendProposal extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: "Not Connected",
            idOrganizador: 1
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
    
      handleClicInscripcionEvento = () => {
        try{ //Verify if I'm logged
            let retrievedObject = sessionStorage.getItem('dataUser');
            let retrievedJson = JSON.parse(retrievedObject);
            
            if (retrievedJson == null){ //I'm not logged
                console.log("No estoy logeado!")
                alert("No has iniciado sesión!")                

                sessionStorage.setItem('currentPage', "SendProposal");			    
			    window.location.replace("./login");
                return
            }
            //I'm logged
            console.log('redireccionando a ... inscribirse evento');
            this.handleNextChildComponentChange(FormSendProposal);

        }catch(err){
            console.log(err)            
        }
        return
      }
   
    render(){

        return(
            <div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="row" id="gradient">
                <div class="col-md-4" style={{paddingBottom:"20px"}}>
                    <img src="img/img3.jpg" class="img-responsive" alt=""/>
                </div>
                <div class="col-md-8" id="overview">
                    <div class="row">
                        
                        <div class="col-xs-5 col-md-5 text-center" id="fan">
                            <h1>15 AGO</h1>
                        </div>

                        <div class="col-xs-4 col-md-4" id="hits">
                            <p style={{color:"black"}}>Categorias</p>
                            <ul class="pb-product-details-ul" >
                                <li>Machine Learning</li>
                                <li>Machine Learning nombre largote</li>
                                <li>Machine Learning</li>
                                <li>Machine Learning</li>                                
                            </ul>
                        </div>                        
                           
                        <div class="col-xs-3 col-md-3 text-center" >
                            <button class="btn"><i class="fa fa-share-alt" aria-hidden="true"/></button>
                            <p>Compartir evento</p>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="row">
                        <button type="button" class="btn btn-success form-control text-center" onClick={this.handleClicInscripcionEvento}>Enviar Propuesta</button>
                    </div>    
                </div>
            </div>
            <div class="row">
                <Tabs defaultIndex={0}>
                                <TabList>
                                    <Tab>Descripción</Tab>
                                    <Tab>Lugar</Tab>
                                    <Tab>Comités</Tab>
                                    <Tab>Contacto</Tab>
                                    <Tab>Directrices para el envio</Tab>  
                                </TabList>

                                <TabPanel>
                                    <p>Compartir evento</p>
                                </TabPanel>
                                
                                <TabPanel>
                                    <p>Compartir evento</p>
                                </TabPanel>
                                
                                <TabPanel>
                                    <p>Compartir evento</p>               
                                </TabPanel>

                                <TabPanel>
                                    <p>Compartir evento</p>               
                                </TabPanel>

                                <TabPanel>
                                    <p>Compartir evento</p>               
                                </TabPanel>

                            </Tabs>                      
            </div>
        </div>
    </div>
</div>
        );
    }
}


export default SendProposal;

