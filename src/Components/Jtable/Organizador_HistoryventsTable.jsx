import React, { Component } from 'react'
import JTableMaterial from '../Special/JTableMaterial';
import MaterialTable from 'material-table';
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class Organizador_HistoryventsTable extends Component {
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
   }
   componentDidMount(){
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      


      Networking.populateDataOrgTab2(this.state.idUser_recived)
      .then((value) => {

         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
            this.renderTableData();
            this.setState({dataReady:1});
         }   
            
      });
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
      let data = [];
      this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas} = element
         data.push(
            {
               num: index+1,
               name:nombre,
               estado: estado,
               report: (<button className="btn_plus" 
                           style={{justifyContent:"center", alignItems:"center"}} 
                           onClick={this.handleClick} >
                              <i class="fa fa-download"></i>
                        </button>)
            }
         )}
         );
      this.setState({data:data});
   };   
    componentWillMount(){
      this.renderHeaders();  
   }

    makedata(dataRady){
      switch (dataRady) {
         case 0:
             return [];
         case 1:
            return this.state.data;
       } 
    }
     renderHeaders(){
      let columns= [
         { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
         { title: 'Lista de eventos', field: 'name',cellStyle:{ width:'82%',fontSize: 14 } },
         { title: 'Estado', field: 'estado', cellStyle:{ fontSize : 14}},        
         { title: 'Reporte', field: 'report',cellStyle:{ width:'18%',fontSize: 14 } },
       ];
       this.setState({columns:columns});
    }
     render() {
        //this.state = this.props.data

        return (
         <div style={{"font-size": "15"}}>               
            <br/><br/>
            <JTableMaterial
               title="Lista de eventos históricos:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)} 
               ready={this.state.dataReady}
            />
         </div>
        )
        
     }
}

export default Organizador_HistoryventsTable//exporting a component make it reusable and this is the beauty of react
