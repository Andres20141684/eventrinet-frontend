import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import '../styles/files_style.css';
import { NetworkMutation_JAchievingData } from '../Network/Networking';

/****/

var reader;
  var progress = document.querySelector('.percent');

  function abortRead() {
    reader.abort();
  }

  

  function updateProgress(evt) {
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


  function errorHandler(evt) {
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
 
  function handleFileSelect_load(evt) {
    // Reset progress indicator on new file selection.
    
  }

/****/


function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files; // FileList object.
  if(files.length >1){
    alert("Solo un archivo PDF putho");
    return;
  }
    // files is a FileList of File objects. List some properties.

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes ','</li>');
                  //f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

  /*************************************** */
  var progress = document.querySelector('.percent');
  progress.style.width = '0%';
  progress.textContent = '0%';

  reader = new FileReader();
  reader.onerror = errorHandler;
  reader.onprogress = updateProgress;
  reader.onabort = function(e) {
    alert('File read cancelled');
  };
  reader.onloadstart = function(e) {
    document.getElementById('progress_bar').className = 'loading';
  };
  reader.onload = function(e) {
    // Ensure that the progress bar displays 100% at the end.
    progress.style.width = '100%';
    progress.textContent = '100%';
    console.log("Inteno de redireccion dentro del evento : "," reader.result ");
    console.log(reader);
    console.log(reader.result);
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
    NetworkMutation_JAchievingData(
      {
        methodPath: 'propuesta/registrar_propuesta',
        JsonToBack:{
          paper: reader.result,/** ARCHIVO */
          idEvento:1,
          idUsuario: 13,
          nombre: "Evento de JIN SAYAJIN",
          coautores: "A",
          RptaCamposPers: [],
          categorias: []},
  
      }
    ).then((value) => {
      console.log(value);
      if(value == null){
        console.error('FALLO FATAL');
      }else {
         console.log('si hay algo:');
      }
      
   });
  
  
  }
  reader.readAsBinaryString(files[0]);
  /********* PRUEBA DE ENVIO DE ARCHIVO ******* */
  

}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

export default class StepTwoSendProp extends React.Component {
  getData(){
    console.log("Conec");
  }
  componentWillMount(){
    console.log("StepTwoSendProp props");
    console.log(this.props);

  }
  componentDidMount(){
    this.getData();
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    var reader;
    var progress = document.querySelector('.percent');
    //document.getElementById('drop_zone').addEventListener('change', handleFileSelect, false);
    /********* CATEGORTIAS DEL EVENTO ****** */
    /*var categories = [];
    for (var i = 0, f; f = files[i]; i++) {
      categories.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes ','</li>');
                  //f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + categories.join('') + '</ul>';*/
  
  
  
  }
  renderOptions(){
    return this.state.datos_tabla.Eventos.map((element, index) => {
         
      const {idEvento, nombre,descripcion,fechaIni,
         fechaFin,lugar,precios,numFases,estado,
         preferencia,tieneCameraRdy,programaCompletado,
         fechaMaxPref,numeroPropuestas} = element
      return (
      
           <>
           </>
      )
   })

  }
  render () {
    
    

    return (
      <div >
        <div class="panel-group mx-auto" style={{width: "600px"}}>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Descripcion</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md-12">
                <label >Actividades</label>
                <input 
                    type="text" 
                    name='actividades'
                    class="form-control" 
                    id="id_actividades"
                    placeholder='Actividades'              
                    onChange={this.props.handleChange}
                    value={this.props.actividades}
                    autoFocus/>
            </div>
            </Row>
            <Row>
            <div class="form-group col-md-12">
                <label>Resumen</label>
                <textarea 
                    type="text" 
                    name='resumen'
                    class="form-control" 
                    id="id_resumen"
                    placeholder='Resumen'
                    onChange={this.props.handleChange}
                    value={this.props.resumen}              
                    />
            </div>
            </Row>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorías</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md-12">              
                <div class="col-xs-9 col-md-9" style={{paddingLeft:0}}>
                  <select class="form-control" id="id_selectCategory">
                    <option>Machine Learning</option>
                    <option>Redes</option>
                    <option>Inteligencia </option>
                    <option>Automirision experta</option>
                    <option>sebiwis</option>
                  </select>
                </div>
                <div class=" col-xs-3 col-md-3"style={{float: "left", paddingRight:0}}>
                  <button type="button" class="btn btn-success" style={{width:"126px"}}>Agregar</button>
                </div>
              </div>
              </Row>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Archivo</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-12"style={{paddingLeft:0}}>
              <label>Subir propuesta. El archivo debe estar en formato PDF (extension PDF)</label>
              <div class="custom-file" >
                <input type="file" class="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"/>
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                <br/>

                <div class="panel panel-default">
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

var styles = {
  rotulos:{
    paddingRight: 80,
  }
}
