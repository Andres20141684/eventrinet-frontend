import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'

import '../../styles/styles_dropzone.css'; 
import JModal from './JModal';

class JUpload  extends Component {
   constructor(props){
      super(props);
      this.state = {
        modal:0,
        progress:null,
        reader:null,
        maxTamanio:10,
        formato:"pdf",
        contenido: 0,
        img_preview: "",
        pdf_preview: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6oK_1G3kzZWbAlYKtyv7Pu2DWMCqYyGkRG4fVsIzWOSJAEzi&s"
      }
      this.handleOnLoad=this.handleOnLoad.bind(this);
      this.abortRead=this.abortRead.bind(this);
      this.updateProgress=this.updateProgress.bind(this);
      this.handleDragOver=this.handleDragOver.bind(this);
      this.handleFileSelect=this.handleFileSelect.bind(this);

    }
    handleOnLoad(e){
        var progress = document.querySelector('.percent');
        progress.style.width = '100%';
        progress.textContent = '100%';
        setTimeout("document.getElementById('progress_bar').className='';", 2000);
        this.props.onSuccesLoad(
        e.target.result);
        this.setState({img_preview:e.target.result});
        
        this.setState({contenido:1});
      }
    abortRead() {
        this.state.reader.abort();
        this.setState({contenido:0});
        document.getElementById('list').innerHTML = '<div>'+'</div>';
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
      
      
      handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // aqui un objeto FileList .
        if(files.length >1){
          //alert("Solo un archivo PDF o te hackeo :)");
          return;
        }
          // files is a FileList of File objects. List some properties.
    
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          if(f.type==this.state.formato){
          }else{
            this.setState({modal:1});
            document.getElementById("btnToggle").click();
            //alert("Pendejo, solo se admite extencion " + this.state.formato);
            return;
          }
          if(f.size>this.props.maxTamanio){
          }else{
            this.setState({modal:0});
            document.getElementById("btnToggle").click();
            //alert("Pendejo, solo se admite tamaño menor a " + this.state.tamanio);
            return;
          }
          output.push('<li><strong>', escape(f.name), '</strong> </li>');
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
   componentDidMount(){
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', this.handleDragOver, false);
    dropZone.addEventListener('drop', this.handleFileSelect, false);
    
    this.state.progress = document.querySelector('.percent');
      
   }
   componentWillMount(){
    console.log("JUpload.props->", this.props);
    // todo pensado en MB
    this.setState({maxTamanio:this.props.maxTamanio});
    if(this.props.formato=="pdf"){
      this.setState({formato:"application/pdf"});
    }
    if(this.props.formato=="jpg" || this.props.formato=="jpeg"){
      this.setState({formato:"image/jpeg"});
    }
    if(this.props.formato=="png"){
      this.setState({formato:"image/png"});
    }

   }
   renderStatus(i){
    switch(i){
      case 0: return "Sube tus archivos aqui";
      case 1: if(this.state.formato=="image/jpeg" || this.state.formato=="image/jpeg" )
                  {return( <div class="imagen-port" 
                            style={{height:"50%"}}>
                            <img src={this.state.img_preview} alt="event"/>
                          </div>)}
              else if(this.state.formato=="application/pdf" ){
                {return( <div class="imagen-port" 
                            style={{height:"50%"}}>
                            <img src={this.state.pdf_preview} alt="event"/>
                          </div>)}
              }
   
    } 
    
     }
     makeModalBody(i){
        switch(i){
          
        case 0: 
            return(
              <div><h1>Solo se admite tamaño menor a: {" " + this.state.tamanio + "MB"}</h1></div>
            );
        case 1:
            return (

              <div><h1>Solo se admite extencion {" " + this.props.formato}</h1></div>
            );
        }
     }
     
     render() {
         return (
            <div class="panel panel-default" >
            <div className="containerDZ">
              <div id="drop_zone">
                {this.renderStatus(this.state.contenido)}
              </div>
              <div id="progress_bar"><div class="percent">0%</div></div>
                <button type="button" class="btn btn-success" 
                        style={{width:"126px"},{backgroundColor:"#3B83BD"}} 
                        onClick={()=>this.abortRead()}>
                          Cancelar
                </button>
            </div>
            <output id="list"></output>
            <JModal
              class ="modal"
              id= "JModalUpload"
              head={"Hunbo un error:"}
              body={this.makeModalBody(this.state.modal)}
              footer= {<><button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button> </>}
          />
          <button id="btnToggle" type="button" data-toggle="modal" data-target="#JModalUpload"> </button>
          </div>
          
        )
     }
}

export default JUpload;  
