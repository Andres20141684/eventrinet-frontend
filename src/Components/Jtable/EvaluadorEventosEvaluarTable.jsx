import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import ActionButtonFASE from './ActionButtonFASE';
import EvaluadorEvaluarPropuestas from './../../Pages/EvaluadorEvaluarPropuestas';
import JTableMaterial from '../Special/JTableMaterial';
const Networking = require('./../../Network/Networking.js') ;


class EvaluadorEventosPrefTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
            Eventos_Evaluador:[
                           ]
         },
         columns:[],
         data:[],
         dataReady:0,
         idFase : 0,
         nomb_fase : ""//"No hay ni un nombre asignado aesta fase :v (este es el default)"
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
      this.obtenerNombreFase=this.obtenerNombreFase.bind(this);
  
    }
    handleNextChildComponentChange(_nextChildComponent){
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }

   componentWillMount(){
      this.renderHeaders();  
   }

   componentDidMount(){
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.populateDataEvalEvaluar(retrievedJson.infoUsuario.idUsuario).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
            this.tableData();
            this.setState({dataReady:1});
         }
         
      });
   }
   shouldComponentUpdate(nextProps, nextState){
      /*if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      if (this.state.nomb_fase != nextState.nomb_fase){//no hace nada :V
         console.log("COMPONENT UPDATE: nomb fase: ", this.state.nomb_fase. nextState.nomb_fase)
         return true;
      }*/
      if(this.state.dataReady != nextState.dataReady){
         return true;
      }
      return false;
   }

   evaluarEvaluador = () =>{
      this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
   }

   obtenerNombreFase(idEvento){
      Networking.faseActual(idEvento).then((value) => {
         console.log(value);
     
         if(value == null){
             console.log('no hay algo aun');
             
         }else {
            console.log("NOOOOOOOOOOOOOO: ",value.Fase.nombre);
             return value.Fase.nombre;
         }
         });

   }
 
   
   tableData() {
      let data = [];
      this.state.datos_tabla.Eventos_Evaluador.map((element, index) => {
         const {faseActual, fasesTotales, fechaLimite, idEvento,nombre} = element

         Networking.faseActual(idEvento).then((value) => {
            console.log(value);
        
            if(value == null){
                  console.log('no hay algo aun');    
            }else {               
                  console.log("nombre_fase:############################ ",value.Fase.nombre);
                  console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
                  this.state.nomb_fase = value.Fase.nombre;
                  this.state.idFase = value.Fase.idFase;
                  console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
            }            
         });
         data.push({
            num:index+1,
            name:nombre,
            statusPhase:faseActual+'/'+fasesTotales,
            dateFin:fechaLimite,
            evalPhase:(<ActionButtonFASE 
               button_class ="fa fa-plus" 
               id_evento={idEvento} 
               nomb_evento ={nombre} //nombre
               idUser_recived={this.state.idUser_recived}               
               /*este se va a settear*/nomb_fase = {this.state.nomb_fase} //"XDD"//{this.state.nomb_fase}//{nombre_fase}//AQUI SE SETTEAN LOS PROPS PARA EL SIG COMPONENTE

               onNextChildComponentChange={this.evaluarEvaluador}
               onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
               button_class ="fa fa-plus"
               />)
         })
      });
      this.setState({data:data});
   }
  
   renderHeaders(){
      let columns= [
         { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
         { title: 'Lista de eventos', field: 'name',cellStyle:{ width:'52%',fontSize: 14 } },
         { title: 'Fase actual / Fases totales', field: 'statusPhase',cellStyle:{ width:'15%',fontSize: 14 } },
         { title: 'Fecha límite', field: 'dateFin',cellStyle:{width:'15%', fontSize: 14 } },
         { title: 'Evaluar fase', field: 'evalPhase' ,cellStyle:{ width:'12%',fontSize: 14 }}
       ];   

       this.setState({columns:columns});
   }
   makedata(dataRady){
      switch (dataRady) {
         case 0:
             return [];
         case 1: 
             return this.state.data;
       } 
    }
   render() { 
      return (         
         <div >
            <JTableMaterial
            title="Lista de eventos a evaluar:"
            columns={this.state.columns}
            data={this.makedata(this.state.dataReady)}
            ready={this.state.dataReady}
            />
         </div>
        )
     }
}

export default EvaluadorEventosPrefTable