import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'

import '../styles/style_record.css'; 
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'
import Row from 'react-bootstrap/Row';

const Networking = require('../Network/Networking.js') ;

function Botones(){
    return ( 
    <div>
        <h2><br/></h2>
        <h3>
        <button class="mybutton" style={{float:'left'}}>Atras</button>
        <button class="mybutton" style={{float:'right'}}>Guardar</button>
        <br/><br/>
        </h3>
    </div>
    )
}
function MainTittle(){
    return ( 
    <div style={{marginLeft:15}}>
        <h1><br/>Community 01 - 15 Marzo</h1>
        <br/><br/>
    </div>    
    )
}


class ProposerDetailProposal extends Component{
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        //console.log("HAAAAAAAAAAAAAAAAAAAAA")
        //Networking.populateDataOrgTab1(8).then((value) => {
              //this.setState({datos_tabla: value});   
        //});
        console.log("ProposerDetailProposal->"+this.props);
     }
    
     componentWillMount(){

     }
    render(){
        return(
            <div style={{justifyContent: "center", alignItems: "center"}}>
            <MainTittle/>
            
            <div class="panel-group"  >
            <div class="panel panel-default ">
                <div class="panel-heading"><h1>Detalle de la propuesta</h1></div>
                <div class="panel-body">
                <Row >
                <div class="form-group col-md-6">
                    <label >Nombre</label>
                    <input 
                        style = {{backgroundColor:"#e9ecef", opacity:1,color: "#828282"}}
                        type="text" 
                        name='nombre'
                        class="form-control" 
                        id="id_name"
                        value="{this.props.name}" readonly/>
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label>Descripcion</label>
                    <textarea 
                        style = {{backgroundColor:"#e9ecef", opacity:1,color: "#828282"}}
                        type="text" 
                        name='descripcion'
                        class="form-control" 
                        id="id_description"
                        value={this.props.description}  readonly/>
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label >Estado</label>
                    <input 
                        style = {{backgroundColor:"#e9ecef", opacity:1,color: "#828282"}}
                        type="text" 
                        name='estado'
                        class="form-control" 
                        id="id_state"
                        value={this.props.state} readonly/>
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label >Fase Actual</label>
                    <input 
                        style = {{backgroundColor:"#e9ecef", opacity:1,color: "#828282"}}
                        type="text" 
                        name='fase'
                        class="form-control" 
                        id="id_phase"
                        value={this.props.phase} readonly/>
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label >Archivo</label>
                    <input 
                        style = {{backgroundColor:"#e9ecef", opacity:1,color: "#828282"}}
                        type="text" 
                        name='lugar'
                        class="form-control" 
                        id="id_place"
                        placeholder='Lugar'
                        value={this.props.lugar} readonly/>
                </div>
                </Row>
                </div>
            </div>
            </div> 
            <br/><br/>
            <Botones/> 
            <br/><br/>
            </div>
            
        );
    }
}
export default ProposerDetailProposal;