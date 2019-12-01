import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import '../styles/styles_dropzone.css';
import { assignmentExpression } from '@babel/types';
import JTable from './Jtable/JTable';
import JCardForm from './Special/JCardForm';
import JUpload from './Special/JUpload';
import './../styles/JStep.css';

class JStep extends React.Component {
    constructor(props){
      super(props);
      this.state={
        arrayOfFases:[],
        numFases:4,
        faseActual:2,
        data:0,
      }
      this.handleOnLoadE=this.handleOnLoadE.bind(this);
   
     this.handleOnLoadA=this.handleOnLoadA.bind(this);
  }
  componentWillMount(){
    console.log("JStep props", this.props);
  
  }
 componentDidMount(){
   this.setState({data: this.props.data});
 }
  shouldComponentUpdate(nextState,nextProps){
    if(nextProps.data != this.props.data){
      return true;
    }
    return false;
  }  
  
  handleOnLoadA(result){
    this.props.multiHandle(
      {to:'archivo', 
      value:result
    });
  }
  handleOnLoadE(result){
    this.props.multiHandle(
      {to:'entregable', 
      value:result
    });
  }
  render () {
    const inputCamposPers =[];
    this.props.CamposPerson.forEach(element => {
      inputCamposPers.push(
        {
          label:element.enunciado,
          category:'textArea',
          name:'campoPEnun',
          placeholder:element.descripcion, 
          id: element.index,  
          readonly:false,           
          onChange:this.defaultMutableHandlePerso,           
        }

      );
    });
    const inputArchivo=[
      
      {
        label: "Subir propuesta corregida. (Si son varios, comprimelos en un solo archivo de extencion .zip)",
        id_drop_zone:"drop_zone_archivo",
        idprogressbar:"progress_bar_archivo",
        category:'JUpload',
        onChange: this.handleOnLoadA,
        fileNedded:this.props.fileNeeded,
        formato:"pdf",
        maxTamanio:100,
      }

    ]
    const inputEntregable=[
      
      {
        label: "Subir el entregable descrito en la descripcion de la fase. (Si son varios, comprimelos en un solo archivo de extencion .zip)",
        id_drop_zone:"drop_zone_entregable",
        idprogressbar:"progress_bar_entregable",
        category:'JUpload',
        onChange: this.handleOnLoadE,
        fileNedded:this.props.entregableNeeded,
        formato:"pdf",
        maxTamanio:100
      }

    ]
    const other=[
     { other : (<label >En esta fase no se requieren datos ni archivos adicionales, esta es una fase no evaluable</label>)}
    ]
    if(inputCamposPers.length===0 && this.props.entregableNeeded===0 &&
      this.props.fileNeeded===0){
        return(<><h1 style={{textAlign:"center"}}>En esta fase no se requieren datos ni archivos adicionales, es todo por ahora</h1></>);
    }else{
        return (
              <div id={this.props.id} class="panel-group">
                
                <h1 style={{textAlign:"center"}}>Ingresa los datos solicitados de la fase actual</h1>

              <JCardForm
                  arrayOfInputData={inputArchivo}
                  cardHeadingText = "Sube el archivo de tu Propuesta corregida: "
              />
              
              <JCardForm
                  arrayOfInputData={inputCamposPers}
                  cardHeadingText = "Informacion solicitada para la Fase:"
              />
              

              <JCardForm
                  arrayOfInputData={inputEntregable}
                  cardHeadingText = "Sube el entregable de la fase : "
              /> 

              


              </div>)
    }
    
      
  }
}
export default JStep;
// HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
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