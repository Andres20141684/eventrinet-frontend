import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import JTableMaterial from '../Special/JTableMaterial';
import JActionButton from '../Special/JActionButton';
import AsignEvalPropuesta from '../../Pages/Asign_Eval_Propuest';
import NewEventPage from '../../Pages/NewEventPage';
const Networking = require('./../../Network/Networking.js') ;


class PresiEventos_asignarEvaTable  extends Component {
   constructor(props){ 
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
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
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    handleClickCAsignarEvaluadores = () => {
      console.log('redireccionando a ... FakeNewIni evento');
      this.handleNextChildComponentChangeProps({  
         idOrganizador_nextProps: this.state.idUser_recived,
         id_evento_nextProps: 0, //para q se actualice el evento no?
         nomb_evento: "none"
         
      });
      
      //this.handleNextChildComponentChange(NewEventPage);
    }
    handleClickAddEval =(idE)=>{
      console.log("retrievedJson");
      this.handleNextChildComponentChangeProps({   
         idEvento: idE,
      });
      console.log("redireccion para AsignEvalPropuesta");
      this.handleNextChildComponentChange(AsignEvalPropuesta);
   }
   handleEditButton =(idO,idE,nom)=>{
      let dataFlow = {   
         idOrganizador_nextProps: idO,
         id_evento_nextProps: idE,
         nomb_evento: nom
         
      }
      this.handleNextChildComponentChangeProps(dataFlow);
      this.handleNextChildComponentChange(NewEventPage);
   }
   componentWillMount(){
      
      this.renderHeaders();
   }

   componentDidMount(){
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.populateDataEvaTab(retrievedJson.infoUsuario.idUsuario).then((value) => {
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
      if(this.state.dataReady != nextState.dataReady){
         return true;
      }
      return false;
   }
  
  
   handleClick2 = () => {
      console.log('redireccionando a ... update evento');
      sessionStorage.setItem('nextProp',
            JSON.stringify(
                           {   idOrganizador_nextProps: this.state.idUser_recived,
                              id_evento_nextProps: 0,
                              nomb_evento: "none"
                              
                           } 
                        ))      
   }
   tableData() {      
      let data = [];
      this.state.datos_tabla.Eventos.map((element, index) => {       
         const {idEvento,propAsignadas,propTotal,nombre,
            inicioEvaluacion} = element
         data.push(
            {
               num: index,
               name: nombre,
               statusAsign:propAsignadas+"/"+propTotal,
               evalIn:inicioEvaluacion,
               asignEval: (<JActionButton 
                   button_class ="fa fa-plus" 
                     idEvento={idEvento} 
                     onClick={()=>this.handleClickAddEval(element.idEvento)}/>
               ),
               edit:(<JActionButton
                  onClick = {()=>this.handleEditButton(this.state.idUser_recived,
                     element.idEvento,
                     element.nombre)}
                  button_class ="fa fa-edit" 
               />
               )
            }
         )
      });
      this.setState({data:data});
    }
    makedata(dataRady){
      switch (dataRady) {
         case 0:
             return [];
         case 1:
            console.log("dataa",this.state.data)
             return this.state.data;
       } 
    }
  
    renderHeaders(){
      let columns= [
         { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
         { title: 'Lista de eventos', field: 'name',cellStyle:{ width:'36%',fontSize: 14 } },
         { title: 'Propuestas asignadas / Total', field: 'statusAsign' ,cellStyle:{ width:'22%',fontSize: 14 }},
         { title: 'Inicio evaluación', field: 'evalIn' ,cellStyle:{width:'20  %'}},
         { title: 'Asignar evaluadores', field: 'asignEval',cellStyle:{width:'4%'} },
         { title: 'Editar fases', field: 'edit' ,cellStyle:{width:'4%'}},
       ];
      this.setState({columns:columns});
    }
  
     render() {
        console.log("renderizando ",this.state.dataReady)
         return (
           <div>              
              <br/><br/>
              <JTableMaterial
               title="Lista de eventos a asignar evaluador:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)}
               ready={this.state.dataReady}
               />
           </div>
        )
     }
}

export default PresiEventos_asignarEvaTable
