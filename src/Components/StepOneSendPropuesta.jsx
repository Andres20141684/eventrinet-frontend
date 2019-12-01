import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import { assignmentExpression } from '@babel/types';
import JCardForm from './../Components/Special/JCardForm'

class StepOneSendPropuesta extends React.Component {
    constructor(props){
      super(props);
      this.state={
        state1:{
            authorName:""
        }
        
      }
      this.defaultMutableHandle=this.defaultMutableHandle.bind(this);
      
    }      

componentWillMount(){
  window.scrollTo(0, 0);
  console.log("StepOneSendProp props ****");
  console.log(this.props);
    
}
DateFormat(date,json,tag){
  let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
  json[tag]=aux
}

defaultMutableHandle(e){
    this.props.multiHandle(
      {to:e.target.name,
        value:e.target.value});
}

renderacademicLevel(){
  const academicLevels = 
  ['Primaria','Secundaria','Profesional','Post-grado','Otros...']
  return academicLevels.map((academicLevel) => {
    return(<option>{academicLevel}</option>)
  })
}
  render () {
    
    const inputAutor =[
      {
        label:"Nombres",
        category:'textArea',
        name:'authorName',
        readonly:true,
        value:this.props.Usuario.nombre, 
        id:"id_name",           
      },
      {
        label:"Apellidos",
        category:'textArea',
        name:'authorLastname',
        id:"id_ap",    
        readonly:true,
        value:this.props.Usuario.apePaterno,
      },
      {
        label:"Telefono principal",
        category:'textArea',
        name:'telefonoAuthor',
        placeholder:'Telefono', 
        id:"id_telf",           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Correo electronico",
        category:'textArea',
        name:'email',
        id:"id_email",
        readonly:true,
        value:this.props.Usuario.correo,
      },
      {
        label:"Afiliacion",
        category:'textArea',
        name:"afilicacion",
        id:"id_selectStudyLevel",
        readonly:false,
        placeholder:'Institucion a la cual esta afiliado', 
        onChange:this.defaultMutableHandle,
        value:this.props.afiliacion
      }
    ]
    const inputGenerales =[
      {
        label:"Nombres",
        category:'textArea',
        name:'authorName',
        placeholder:'Nombre', 
        id:"id_name",  
        readonly:false,           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Apellidos",
        category:'textArea',
        name:'authorLastname',
        placeholder:'Apellidos', 
        id:"id_ap",  
        readonly:false,           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Correo electronico",
        category:'textArea',
        name:'email',
        placeholder:'Email' ,
        id:"id_email", 
        readonly:false,               
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Afiliacion",
        category:'textArea',
        name:"academicLevel",
        id:"id_Afiliacion",
        onChange:this.defaultMutableHandle,
      }
    ]
    


    return (
      <div id={this.props.id} class="panel-group" style={styles.panel,{color:"#002D3D"}}>
      
          <h1 style={{textAlign:"center"}}>Ingresa los datos del Autor y Co-autores</h1>

              <JCardForm
                arrayOfInputData={inputAutor}
                cardHeadingText = "Datos Generales del Autor"
              />
              <JCardForm
                arrayOfInputData={inputGenerales}
                cardHeadingText = "Datos Generales de otro Autor: (puede dejarlo en blanco)"
              />

      </div>
      
    )
  }
}
export default StepOneSendPropuesta;
var styles = {
  rotulos:{
    paddingRight: 80,
  },
  panel:{
    margin:'auto',
    maxWidth:'620px',
    minWidth:'330px',
    paddingRight:'2%',
    paddingLeft:'2%',
  }

}