import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/dash_style.css';
import { textAlign } from '@material-ui/system';
/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
class EventDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      imagensrc: "http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png",
        
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        idUser:0,
        Propuestaprev:{},
        Usuario: null,
        /*viene de los props */
        event:{
          nombre:"<Nombre de evento>",
          imagen: "http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png",
        },
        /* viene en los props */
        fase: 0,
        proposal:{
          nombre:"nombre de la propuesta",
          detalle:"detalle de la propuesta",
          estado:"estado de la propuesta",
          fase : 0
        }
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
 shouldComponentUpdate(nextProps, nextState){
    if(this.state.propuesta != nextState.propuesta){
       return true;
    }
    return false;
 }

  render(){
    return (
      <section className="contenedor sobre-nosotros">     
        <h2 className="titulo">{this.state.event.nombre + " - " + this.state.event.fechaIni}</h2>
        <h2 style ={{textAlign:"left"}} className="titulo">Detalle de propuesta:</h2>
        <div className="contenedor-sobre-nosotros">
            
            <div className="contenido-textos">
                <h3><span>Descripcion</span>Las mejores organizaciones de eventos</h3>
                <p>Sé parte de la familia Eventrinet y empieza administrar tus eventos
                   académicos y profesionales, call for papers, y más.</p>
                <h3><span>Estado</span>Las mejores acogidas</h3>
                <p>Eventrinet es una plataforma de difución de eventos
                   alrededor del mundo y nuestro servicio es utilizado
                   por grandes compañias, universidades entre otros.</p>
                   <h3><span>Fase Actual</span>Las mejores acogidas</h3>
                <p>Eventrinet es una plataforma de difución de eventos
                   alrededor del mundo y nuestro servicio es utilizado
                   por grandes compañias, universidades entre otros.</p>
                   <h3><span>Archivo</span>Las mejores acogidas</h3>
                <p>Eventrinet es una plataforma de difución de eventos
                   alrededor del mundo y nuestro servicio es utilizado
                   por grandes compañias, universidades entre otros.</p>
            </div>
            <img src={this.state.imagensrc} alt="" className="imagen-about-us"/>
        </div>
    </section>
    );
  }
}

export default EventDetail;

















