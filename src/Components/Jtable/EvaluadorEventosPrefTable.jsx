import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefCategorias from './../../Pages/ElegirPrefCategorias.jsx';
import ElegirPrefPropuestas from './../../Pages/ElegirPrefPropuestas.jsx';
import JTableMaterial from '../Special/JTableMaterial';
const Networking = require('./../../Network/Networking.js') ;


class EvaluadorEventosPrefTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          transport: "go to Fake Ini",
          idUser_recived : 0,
         datos_tabla: {
            Eventos_Evaluador:[
                           ]
         },
         columns:[],
         data:[],
         dataReady:0
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
      //this.elegirPrefCat = this.elegirPrefCat.bind(this);
      //this.elegirPrefProp = this.elegirPrefProp.bind(this);
      this.handleSelectPreference = this.handleSelectPreference.bind(this);
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


      Networking.populateDataEvalElegirPref(retrievedJson.infoUsuario.idUsuario).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
            this.setState({idUser_recived : retrievedJson.infoUsuario.idUsuario});
            this.tableData();
            this.setState({dataReady:1});
            
         }
         
      });
   }
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.dataReady != nextState.dataReady){         
         return true;
      }
      return false;
   }
   makedata(dataRady){
      switch (dataRady) {
         case 0:
             return [];
         case 1: 
             return this.state.data;
       } 
    }
      handleSelectPreference(preferencia,nombre,id){
         console.log(preferencia)
         let retrievedObject = sessionStorage.getItem('dataUser');
         let retrievedJson = JSON.parse(retrievedObject);  
         let idUser= retrievedJson.infoUsuario.idUsuario;
         console.log(retrievedJson);
         this.props.onNextChildComponentChangeProps(
            {
               idUser_:idUser,
               nomb_evento: nombre,
               idEvento:id,
               Usuario:this.props.nextChildComponentProps.Usuario
            }
            );
         if(preferencia == 'CATEGORIA'){
            console.log("entre x catego")
           
            this.props.onNextChildComponentChange(ElegirPrefCategorias);
            console.log(ElegirPrefCategorias)
         }else{
            console.log("entre x propuesta")
            this.props.onNextChildComponentChange(ElegirPrefPropuestas);
            console.log(ElegirPrefPropuestas)

         }
      }
   
   tableData() {
      let data = []
      this.state.datos_tabla.Eventos_Evaluador.map((element,index) => {   
         const {fechaMaxPref,idEvento,nombre,preferencia} = element
         data.push(
            {
               num: index+1,
               name: nombre, 
               fechaMax: fechaMaxPref, 
               tipoPref: preferencia, 
               addPref: (<ActionButton 
                  button_class ="fa fa-plus"
                  id_evento={idEvento} 
                  nomb_evento ={nombre} 
                  idUser_recived={this.state.idUser_recived} 
                  //cambiar condicionar para elegirPrefCat o elegirPrefProp
                  //onNextChildComponentChange={this.elegirPrefCat}
                  //onNextChildComponentChange={this.elegirPrefProp}
                  onNextChildComponentChange={()=>this.handleSelectPreference(
                     element.preferencia,
                     element.nombre,
                     element.idEvento
                     )}
                  onNextChildComponentChangeProps=
                  {this.props.onNextChildComponentChangeProps}
                  />)
            }
         )
      });
      this.setState({data:data});
   }
   renderHeaders(){
      let columns= [
         { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
         { title: 'Lista de eventos', field: 'name',cellStyle:{ width:'52%',fontSize: 14 } },
         { title: 'Fecha máxima', field: 'fechaMax',cellStyle:{ width:'15%',fontSize: 14 } },
         { title: 'Tipo de preferencia', field: 'tipoPref',cellStyle:{width:'22%', fontSize: 14 } },
         { title: 'Agregar preferencias', field: 'addPref' ,cellStyle:{ width:'12%',fontSize: 14 }}
       ];
       this.setState({columns:columns});
    }
  
     render() {
         return (
            
           <div>
               <JTableMaterial
               title="Lista de eventos a elegir preferencias:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)}
               ready={this.state.dataReady}
          />
           </div>
        )
     }
}

export default EvaluadorEventosPrefTable