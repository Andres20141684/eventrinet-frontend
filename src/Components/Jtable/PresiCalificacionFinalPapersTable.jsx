import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import JTableMaterial from '../Special/JTableMaterial';
import EvaluacionPresidente from  './EvaluacionPresidente';
const Networking = require('./../../Network/Networking.js') ;
  

class PresiCalificacionFinalPapersTable  extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
         idUser_recived:0,
         datos_tabla: {
            Eventos:[ 
            ]
         },
         columns:[],
         data:[],
         dataReady:0
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    
   }

   handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
      console.log("Parametros pasados ",_nextChildComponentProps);  
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    componentWillMount(){
      
      this.renderHeaders();
      
   }
   componentDidMount(){
      console.log("props____ revisionfinal",this.props)
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;

      Networking.populateDataPresiEvalFinal(this.state.idUser_recived)
      .then((value) => {

         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            console.log("CAMBIAAA EL SERVICIO PLEASEEEEEEE....")
            console.log("debes ademas devolver lista de fases y lista de idFases")
            this.setState({datos_tabla:value});
            this.renderTableData();
            this.setState({dataReady:1});
         }   
            
      });
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  handleClickEvaularPaper (evt,idEvento,nombre,fasesTotales,secuencia,fechaLimite,idFaseActual,nombreFase){
   this.handleNextChildComponentChangeProps(
      {idEvent:idEvento,
      nombreEvento:nombre,
      fasesTotales:fasesTotales,
      secuencia:secuencia,
      fechaLimite:fechaLimite,
      idFaseActual : idFaseActual,
      nombreFase:nombreFase,
      Usuario:this.props.nextChildComponentProps.Usuario
   });
   console.log("idEvento",idEvento);
   this.handleNextChildComponentChange(EvaluacionPresidente);
  }
  makedata(dataRady){
   switch (dataRady) {
      case 0:
          return [];
      case 1: 
          return this.state.data;
    } 
 }
 shouldComponentUpdate(nextProps, nextState){
   if(this.state.dataReady != nextState.dataReady){
      return true;
   }
   return false;
 }
   renderTableData() {
      let data = [];

      this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,secuencia, fasesTotales,fechaLimite,idFaseActual,nombreFase} = element
            data.push(
               {
                  num: index +1,
                  name:nombre,
                  statusFase:secuencia+"/"+fasesTotales,
                  dateLimit:fechaLimite,
                  approve:
                  (<button onClick={e => {this.handleClickEvaularPaper(e,idEvento,nombre,fasesTotales,secuencia,fechaLimite,idFaseActual, nombreFase)}} style={{background:"none", border:"none"}}><a><i className ="fa fa-plus" /></a></button>),
               }                
        )
        })
        this.setState({data:data});
    }
    renderHeaders(){
      let columns= [
         { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
         { title: 'Lista de eventos', field: 'name' ,cellStyle:{ width:'35%',fontSize: 14 }},
         { title: 'Fase actual / Fases totales', field: 'statusFase' },
         { title: 'Fecha límite', field: 'dateLimit' },
         { title: 'Aprobar Propuestas', field: 'approve' },
       ];
       this.setState({columns:columns});
     }
  
     render() {
        return (
         <div>
             <JTableMaterial
               title="Lista de eventos en evaluación:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)}
               ready={this.state.dataReady}
               />
         </div>
        )
     }
}

export default PresiCalificacionFinalPapersTable//exporting a component make it reusable and this is the beauty of react
