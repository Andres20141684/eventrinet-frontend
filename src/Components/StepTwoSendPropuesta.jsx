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
import JTable from './Jtable/JTable';
import JCardForm from './Special/JCardForm';

class StepTwoSendPropuesta extends React.Component {
    constructor(props){
      super(props);
      this.state={
        categorias: [],
        progress:null,
        reader:null
      }
      this.defaultMutableHandle=this.defaultMutableHandle.bind(this);
      this.handleFileSelect=this.handleFileSelect.bind(this);

      this.abortRead=this.abortRead.bind(this);
      this.updateProgress=this.updateProgress.bind(this);
      this.handleDragOver=this.handleDragOver.bind(this);
      this.handleOnLoad=this.handleOnLoad.bind(this);
      this.renderBody=this.renderBody.bind(this);
      this.renderHeaders=this.renderHeaders.bind(this);
      this.handleChecked=this.handleChecked.bind(this);
}
/** ARCHIVO */ 
  abortRead() {
    this.state.reader.abort();
  }
  updateProgress(evt) {
  var progress = document.querySelector('.percent');
  // evt is an ProgressEvent.
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
  }
  errorHandler(evt) {
  switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      alert('An error occurred reading this file.');
  };
  }
  handleOnLoad(e){
    var progress = document.querySelector('.percent');
    progress.style.width = '100%';
    progress.textContent = '100%';
    console.log("Inteno de redireccion dentro del evento : "," reader.result ");

    setTimeout("document.getElementById('progress_bar').className='';", 2000);
    console.log("<<<<< se leyo putho!!!!>>>>");
    //console.log("e",e);
    console.log("this.state.reader",this.state.reader.result);
    
    this.props.multiHandle(
      {to:'archivo', 
      value:this.state.reader.result
    });
  }
  handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // aqui un objeto FileList .
    if(files.length >1){
      alert("Solo un archivo PDF putho");
      return;
    }
      // files is a FileList of File objects. List some properties.

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes ','</li>');
                  //f.lastModifiedDate.toLocaleDateString(), '</li>'); no se porque xux a no puedo leer ese atributo
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    /*************************************** */
    var progress = document.querySelector('.percent');
    progress.style.width = '0%';
    progress.textContent = '0%';

    this.state.reader = new FileReader();
    this.state.reader.onerror = this.errorHandler;
    this.state.reader.onprogress = this.updateProgress;
    this.state.reader.onabort = function(e) {
      alert('File read cancelled');
    };
    this.state.reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    
    this.state.reader.onload = this.handleOnLoad;

    this.state.reader.readAsDataURL(files[0]);
    /********* PRUEBA DE ENVIO DE ARCHIVO ******* */
  } 

  handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  shouldComponentUpdate(nextState,nextProps){
    if(nextProps.categorias != this.props.Categorias){
      return true;
    }
    return false;
  }


/** ARCHIVO */
  getData(){
    console.log("Conec");
  }
  componentWillMount(){
    console.log("StepTwoSendProp props");
    console.log(this.props);


  }
  componentWillMount(){
    
  }
  componentDidMount(){
    this.getData();
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', this.handleDragOver, false);
    dropZone.addEventListener('drop', this.handleFileSelect, false);
    
    this.state.progress = document.querySelector('.percent');

  }
  DateFormat(date,json,tag){
    let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    json[tag]=aux
  }
  handleAddCategorie=() =>{
    /*
    var output = [];
    
    output.push('<li><strong>', document.getElementById('id_selectCategory').value ,'</li>');
    console.log('Pruebas handleAddCategorie:');
    //categorias.concat(document.getElementById('id_selectCategory').value);
    this.props.multiHandle({to:'categorias',value:document.getElementById('id_selectCategory').value});
    //console.log(document.getElementById('id_selectCategory'));
    //console.log(document.getElementById('id_selectCategory').value);
    document.getElementById('CategorieList').innerHTML =  output.join('') ;
  */
  }
  defaultMutableHandle(e){
    this.props.multiHandle({to:e.target.name,value:e.target.value});
  }
  renderOptions(){
    return this.props.Categorias.map((element, index) => {
      const {descripcion} = element
      return (
        <option>{descripcion} </option>
      )
   })

  }
  renderHeaders(){
    return(
      <tr>
          <th align= "left" scope="col">Categoria</th>
          <th scope="col">Agregar</th>
      </tr>
    )
  }
  handleChecked(e){
      console.log("Selected categorie: ",e.target.id);
      let mode_check = e.target.checked?'add':'rmv';
      this.props.multiHandle(
        {
          to: e.target.name,
          value: {
                    mode:mode_check,
                    value:e.target.id,
                  }
        }
      );
  }
  renderBody(){
    return this.props.Categorias.map((element, index) => { 
      const {idCategoria, descripcion} = element
      return (
      <tr >
            <td >{index+1} &nbsp;&nbsp; {descripcion}</td>
            <td >
              <form>
                  <input
                    type="checkbox"
                    id={idCategoria}
                    name='categorias'
                    onChange={this.handleChecked}
                  />
              </form>
            </td>
      </tr>
      )});
  }
  render () {
    const inputPaperDescripcion =[
      {
        label:"Titulo",
        category:'textArea',
        name:'titulo',
        placeholder:'Titulo', 
        id:"id_Titulo",           
        onChange:this.defaultMutableHandle,
        value:this.props.titulo,
      },
      {
        label:"Resumen",
        category:'textBox',
        name:'resumen',
        placeholder:'Resumen' ,
        id:"id_resumen",             
        onChange:this.defaultMutableHandle,
        value:this.props.resumen
      }
      ,
      
    ]
    const inputCategorias= [
      {
        label:"Escge las categorias a participar",
        category:'Jtable',
        id:"id_resumen",             
        headers:this.renderHeaders,
        body:this.renderBody
      }
    ]
    return (
      <div>
        <h1>Ingresa los detalles de la propuesta y sube un archivo</h1>

        <JCardForm
          arrayOfInputData={inputPaperDescripcion}
          cardHeadingText = "Escribe una breve reseña de tu propuesta"
        />
        
        <JCardForm
          arrayOfInputData={inputCategorias}
          cardHeadingText = "Escoge tus Categorias"
        />

        <div class="panel-group mx-auto" style={{width: "600px"}}>
          
          
          <br></br>




          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorías</h1></div>
            <div class="panel-body">

            




            </div>
          </div>




          <br></br>
          <div class="panel panel-default" >
            <div class="panel-heading"><h1>Archivo</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-12"style={{paddingLeft:0}}>
              <label>Subir propuesta. El archivo debe estar en formato PDF (extension PDF)</label>
              <div class="custom-file" >
                <input type="file" class="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"/>
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                <br/>

                <div class="panel panel-default" >
                  <div id="drop_zone">Arrastra tus archivos aqui :)</div>
                  <button type="button" class="btn btn-success" style={{width:"126px"}} onclick="abortRead();">Cancel read</button>
                  <div id="progress_bar"><div class="percent">0%</div></div>
                  <output id="list"></output>
                </div>


              </div>
              
              </div>
            </div>
          </div>
          <br></br>
        </div>      
      </div>
    )
  }
}
export default StepTwoSendPropuesta;
var styles = {
  rotulos:{
    paddingRight: 80,
  }
}