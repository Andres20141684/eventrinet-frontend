import React, { Component } from 'react'
import '../../styles/styles'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/style_sheets.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import FormPropsxFasePresidente from './FormPropsxFasePresidente'
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
            tabIndex:0
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
    
     
   handleClick = () => {
    console.log('this is:', this);
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
         });
    
    console.log("Seteado todos los valores del state",this.state);
    
    this.state.idEvento =this.props.nextChildComponentProps.idEvent
    this.state.nombreEvento =this.props.nextChildComponentProps.nombreEvento
    this.state.fasesTotales=this.props.nextChildComponentProps.fasesTotales
    this.state.secuencia=this.props.nextChildComponentProps.secuencia
    this.state.fechaLimite=new Date(parseInt(yyIni),parseInt(mmIni),parseInt(ddIni))

    console.log("Seteado todos los valores del state pero a la mala xq no se pudo :v",this.state);

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let header=  this.state.nombreEvento + " - " +  this.state.fechaLimite.getUTCDate().toString(10) + " " +monthNames[this.state.fechaLimite.getUTCMonth()];
    this.setState({header:header});
    console.log(header)
  }
  setTabIndex(index){
      this.setState({tabIndex:index});
      console.log(this.state.tabIndex)
  }
     render() {
         
        return (
            <div> 
            
            <div className="Main-tittle">
                <div style={{marginLeft:15}}>                
                <h1><br/>{this.state.header}</h1>

                </div>
                <div style={{marginLeft:40,marginTop:25}} ><h4>Fases de evaluación</h4></div>
            </div>

            <div class="container" >
                <div class ="panel-body">
                    <Tabs defaultIndex={0} onSelect={index => this.setTabIndex(index) }>

                            <TabList>
                                <Tab>Fase 1</Tab>
                                <Tab>Fase 2</Tab>
                                <Tab>Fase 3</Tab>                                
                            </TabList>
                            <TabPanel>                            
                                <FormPropsxFasePresidente
                                  fase={this.state.tabIndex}
                                  idEvento= {this.state.idEvento}
                                  nextChildComponentProps={this.props.onNextChildComponentChange} 
                                  NextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                  />                                
                            </TabPanel>
                            <TabPanel> 
                                <FormPropsxFasePresidente
                                    fase={this.state.tabIndex}
                                    idEvento= {this.state.idEvento}
                                    NextChildComponentChange={this.props.onNextChildComponentChange} 
                                    NextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    />
                            </TabPanel>
                            <TabPanel> 
                                <FormPropsxFasePresidente
                                    fase={this.state.tabIndex}
                                    idEvento= {this.state.idEvento}
                                    NextChildComponentChange={this.props.onNextChildComponentChange} 
                                    NextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <br/><br/>
                </div>
        )
     }
}

export default EvaluacionPresidente

