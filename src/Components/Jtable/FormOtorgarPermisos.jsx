import React, { Component } from 'react'
import '../../styles/styles'
import ActionButton from './ActionButton';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/style_sheets.css'; 

const Networking = require('../../Network/Networking') ;

class FormOtorgarPermisos extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
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
  
     render() {
        //this.state = this.props.data
        return (
        <div>
            <div style={{marginLeft:15}} className="container">
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>

            <div className="container">
            <div class="panel panel mypanel ">
                <Row>
                <div class="form-group col-md-6">
                    <label >Correo del usuario</label>
                    <input 
                        type="text" 
                        name='lugar'
                        class="form-control" 
                        id="id_place"
                        placeholder='Lugar'                
                        onChange={this.props.handleChange}
                        value={this.props.lugar}
                        maxLength="150"
                    />
                </div>
                </Row>
                
            </div>
            </div>
    </div>
        )
     }
}

export default FormOtorgarPermisos

