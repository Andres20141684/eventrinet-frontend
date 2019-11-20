import React, { Component } from 'react'
import '../../styles/styles'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/style_sheets.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import FormPropsxFasePresidente from './FormPropsxFasePresidente'
import PresiAsignarEvalEvents from '../../Pages/PresiAsignarEvalEvents'
const Networking = require('../../Network/Networking') ;

class EvaluacionPresidente extends Component {
    constructor(props) { 
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idEvento:0,
            datos_tabla: {
                Organizadores:[
                ]
            },
            nombreEvento:'',
            fasesTotales:0,
            secuencia:0,
            fechaLimite: new Date(),
            header:'aasd',
            tabIndex:0,
            idFaseActual:0,
            nombreFase:'',
            datos_tabla2:{
                Fases:[
                ]
            }
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    
     

  componentWillMount(){
    console.log("cambie de componet y el props pasado es:",this.props.nextChildComponentProps);
    let yyIni=this.props.nextChildComponentProps.fechaLimite.substr(0,4);
    let mmIni=this.props.nextChildComponentProps.fechaLimite.substr(8,2);
    let ddIni=this.props.nextChildComponentProps.fechaLimite.substr(5,2);

    this.setState(
        {idEvento:this.props.nextChildComponentProps.idEvent,
            nombreEvento:this.props.nextChildComponentProps.nombreEvento,
            fasesTotales:this.props.nextChildComponentProps.fasesTotales,
            secuencia:this.props.nextChildComponentProps.secuencia,
            tabIndex:this.props.nextChildComponentProps.secuencia,
            fechaLimite:new Date(parseInt(yyIni),parseInt(mmIni),parseInt(ddIni)),
            idFaseActual:this.props.nextChildComponentProps.idFaseActual,
            nombreFase:this.props.nextChildComponentProps.nombreFase
         });
    
    console.log("Seteado todos los valores del state",this.state);
    
    this.state.idEvento =this.props.nextChildComponentProps.idEvent
    this.state.nombreEvento =this.props.nextChildComponentProps.nombreEvento
    this.state.fasesTotales=this.props.nextChildComponentProps.fasesTotales
    this.state.secuencia=this.props.nextChildComponentProps.secuencia
    this.state.fechaLimite=new Date(parseInt(yyIni),parseInt(mmIni),parseInt(ddIni))
    this.state.idFaseActual=this.props.nextChildComponentProps.idFaseActual
    this.state.nombreFase=this.props.nextChildComponentProps.nombreFase

    console.log("Seteado todos los valores del state pero a la mala xq no se pudo :v",this.state);

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let header=  this.state.nombreEvento + " - " +  this.state.fechaLimite.getUTCDate().toString(10) + " " +monthNames[this.state.fechaLimite.getUTCMonth()];
    this.setState({header:header});
    console.log(header)

    /* YOPS jxjx */
    console.log("EL ID EVENTO: ",this.props.nextChildComponentProps.idEvent);
    Networking.listarFasesXEvento(this.props.nextChildComponentProps.idEvent).then((value) => {
        console.log(value);
        if(value == null){
          console.log('no hay algo aun');
          
        }else {
          console.log('si hay algo:');
          this.setState({datos_tabla2:value});
          console.log("Fases: ",this.state.datos_tabla2.Fases);
        }
        
      });
  }
  
  handleReturn(){
    this.props.onNextChildComponentChange(PresiAsignarEvalEvents);
    //this.handleNextChildComponentChange(PresiAsignarEvalEvents);
  }
  /*tableData() {
    //console.log("Render LISTADO: ",this.props);
    return this.state.datos_tabla2.Fases.map((element, index) => { 
     const {idFase,nombre} = element
     return (
     <Tab>{nombre}</Tab>
      )
    })
   }*/
     render() {
         
        return (
            <div> 
            
            <div className="Main-tittle">
                <div style={{marginLeft:15}}>                
                <h1><br/>{this.state.header}</h1>
                </div>
                 <div style={{marginLeft:40,marginTop:25}} ><h4>Fase Actual: {this.props.nextChildComponentProps.secuencia}</h4></div>
            </div>

            <div class="container" >
                <div class ="panel-body">
                    <FormPropsxFasePresidente
                        nextChildComponentProps={this.props.onNextChildComponentChange} 
                        NextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                    /> 

                    <div style={{paddingTop:'20px'}}>
                    <button  
                        style={{float:'left'}}
                        class="mybutton"
                        onClick={this.handleReturn}
                        >
                            Regresar
                    </button>
                    <div style={{display: 'flex', justifyContent: 'center',width:'96px'}}>
                    <button  
                        class="mybutton"
                        //onClick={props.handleCancel}
                        >
                            Rechazar
                    </button>
                    </div>

                    <button  
                        style={{float:'right'}}
                        class="mybutton"
                        //onClick={props.handleCancel}
                        >
                            Aprobar
                    </button>                            
                    </div>
                    </div>
                </div>
                <br/><br/>
                </div>
        )
     }
}

export default EvaluacionPresidente

