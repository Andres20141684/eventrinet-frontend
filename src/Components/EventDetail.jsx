import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/style_ProposalDetail.css';
import { textAlign } from '@material-ui/system';
import { getPaper ,NetworkMutation_JAchievingData} from '../Network/Networking';
/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
function MainTittle(props){
  return ( 
  <div style={{marginLeft:15}}>
<h1><br/>{props.title || "TITULO - "} - {props.fecha || "FECHA"}</h1>
      <br/><br/>
  </div>    
  )
}
/** AQUI SE ESTA MANEJANDO EL                             ***************
 *                               DETALLE DE PROPUESTA       *************
 * 
 *        EL NOMBRE SUGIERE EVENTO PERO YA ES TARDE PARA CAMBARLO XDDDDDD
 */
class EventDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      imagensrc: "http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png",
      archivo:null,
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        idUser:0,
        Propuestaprev:{requiereArchivo:true,requiereArchivo:true},
        Usuario: null,
        /*viene de los props */
        event:{
          nombre:"<Nombre de evento>",
          imagen: "http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png",
        },
        /* viene en los props */
        fase: 0,
        Propuesta:{
          titulo: "WADVASWD",
          resumen: "",
          estado: "SUBIDO",
          coautores: [
              {
                  "nombreComp": "vw waDV",
                  "afiliacion": "Secundaria"
              }
          ],
          tienePaper: 0
      },
        proposal:{
          nombre:"nombre de la propuesta",
          detalle:"detalle de la propuesta",
          estado:"estado de la propuesta",
          fase : 0,
        },
        link_propuestabase64:"#",
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);

  }
  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }
  handleRedireccion = () => {
    console.log('redireccionando a ... FakeNewIni evento');
    /* nuevos props? */
    this.handleNextChildComponentChangeProps(
            {
            /* ... */
            }
    );
    /** a donde redirijir? */
    this.handleNextChildComponentChange(null);
  }
  componentWillMount(){
    console.log("Event Detail props ->",this.props);
      /** obtengo  el idUsuario */
      
    this.setState({idUser: this.props.nextChildComponentProps.idUser});
    this.setState({event: this.props.nextChildComponentProps.evento});
    this.setState({Propuestaprev: this.props.nextChildComponentProps.Propuestaprev});
    //console.log(retrievedJson);


 }
 componentDidMount(){
    NetworkMutation_JAchievingData(
      {
        methodPath: 'propuesta/mostrar_detalle',
        JsonToBack:{
            idPropuesta: this.state.Propuestaprev.idPropuesta
        },
      }
    ).then((value) => {
      console.log(value);
      if(value == null || value.succeed==false){
        console.error('FALLO FATAL');
      }else {
        this.setState({Propuesta:value});
      }
    });
 }
 shouldComponentUpdate(nextProps, nextState){
    if(this.state.propuesta != nextState.propuesta){
       return true;
    }
    return false;
 }
 handleDonwload = () => {

  getPaper(this.state.Propuesta.idPropuesta).then(
    (response)=>{
      this.setState({link_propuestabase64:response.Propuesta});
      document.getElementById('JinSSJ').click();
    })
    .catch( (err) =>{
      console.log("error en conexión Propuesta");
      alert("Error al descargar la propuesta ID:"+this.state.Propuesta.idPropuesta );
    })
}

  render(){
    const coautores=[];
    this.state.Propuesta.coautores.forEach(coautor => {
      coautores.push("Nombres:" + coautor.nombreComp);
    });
    return (
      <><br/><section className="contenedor_detail sobre-nosotros" style={style.detalle}> 
  <h2 style ={{textAlign:"left"}} className="tituloPropuesta">{this.state.event.nombEvento + "-" + this.state.event.fechaIni}</h2>    
    <h2 style ={{textAlign:"center"}} className="tituloPropuesta">Detalle de propuesta: {" - FASE: " + this.state.event.faseActual + "/" +this.state.event.totFases}</h2>
        
        <div className="contenedor_detail-sobre-nosotros" >
            
            <div className="contenido-textos">
                <h3><span><i style={{color: "#fff"}} class="fa fa-shield"></i></span>Titulo:</h3>
                <p>{this.state.Propuesta.titulo ||"Titulo de la propuesta"}</p>

                <h3><span><i style={{color: "#fff"}}class="fa fa-shield"></i></span>Resumen</h3>
                <p>{this.state.Propuesta.resumen ||"Resumen de la propuesta"}</p>

                <h3><span><i style={{color: "#fff"}}class="fa fa-shield"></i></span>Estado:<p>{" "+this.state.Propuesta.estado ||"Resumen de la propuesta"}</p></h3>
                

                <h3><span><i style={{color: "#fff"}}class="fa fa-shield"></i></span>Fase Actual:<p>{' '+this.state.event.faseActual ||"faseActual de la propuesta"}</p></h3>
                

                <h3><span><i style={{color: "#fff"}}class="fa fa-shield"></i></span>Archivo</h3>
                <p>{(this.state.Propuesta.tienePaper>0)?
                    "Descargar Propuesta: "(
                    <i class="fa fa-download"  
                        aria-hidden="true"
                         onClick={this.handleDonwload}>  
                     </i>
                    )
                  :"No se requiere Archivo en esta fase"}
                </p>
                <a id='JinSSJ' onClick={this.handleClick}
                  href={this.state.link_propuestabase64} 
                  download="propuesta.pdf" ></a>

                <h3><span><i style={{color: "#fff"}}class="fa fa-shield"></i></span>Archivo</h3>
                <p>{(this.state.Propuesta.estado==2)?"Descargar Propuesta:":"No se requiere Archivo"}</p>

            </div >
                <img className="imagen-about-us" src={this.state.imagensrc} alt=""/>
            <div >
            
            </div>
        </div>
        
    </section><br/></>
    );
  }
}

export default EventDetail;



const style={
  detalle:{background:"#eee"}
}













