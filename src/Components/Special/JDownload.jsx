/* esto me sirvepara los campos personalizados XD */

import React, { Component } from 'react';
const Networking = require('../../Network/Networking') ;
class JDownload extends Component {
    constructor(props){
        super(props);
        this.state={
            link_propuestabase64:"#",

        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.link_propuestabase64 != this.state.link_propuestabase64){
            return true;
        }
        return false;
    }
    handleClickB = () => {
        if (this.props.idDescarga){
            
            Networking.getPaper2(this.props.idDescarga).then(
            (response)=>{this.setState({link_propuestabase64:response.Propuesta});
                document.getElementById('JinSSJ').click();
            })
            .catch( (err) =>{
                console.log("error en conexión Propuesta");
            })

        }
      }
    render(){
        console.log("renderin ****",this.props);
        return(
            <>
            <button 
                  style={{width:'80px',marginTop:10,marginBottom:10}}
                    className="specialButton" 
                    onClick={this.handleClickB}
                    > 
                    <i class="fa fa-download" style={{color:'#6CDCD6'}}></i>
            </button>   
            
            <a
                    id='JinSSJ' 
                     class="btn" 
                    style={{color:'white',float:'right',
                    height:'0px',width:'0px'}} 
                    href={this.state.link_propuestabase64} 
                    title="Descargar propuesta" download={this.props.nombre + this.props.extencion} >
                
            </a>
            </>
        );
        
    }
}
export default JDownload;

/* La forma de invocar este boton es :

<JDownload
                      idDescarga={157}      -> le das el Id de lo que qieres descargar
                      extencion={".xlsx"}   -> le das extencion
                      nombre = {"Archivo"}   -> y nombre
                      paper=1
                  />



*/