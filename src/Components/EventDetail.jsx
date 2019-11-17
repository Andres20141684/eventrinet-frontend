import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import './../styles/dash_style.css';
/**
 * Necesito una lista de eventos, y na foto parq eru pueda
 */
class EventDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
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
      /** obtengo  el idUsuario */
      
    this.setState({Usuario: this.props.nextChildComponent.Usuario});
    
    this.setState({Propuesta: this.props.nextChildComponent.Propuesta});
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

        <h2 className="titulo">Nuestro producto</h2>
        <div className="contenedor-sobre-nosotros">
            <img src="./img/ilustracion1.png" alt="" className="imagen-about-us"/>
            <div className="contenido-textos">
                <h3><span>1</span>Las mejores organizaciones de eventos</h3>
                <p>Sé parte de la familia Eventrinet y empieza administrar tus eventos
                   académicos y profesionales, call for papers, y más.</p>
                <h3><span>2</span>Las mejores acogidas</h3>
                <p>Eventrinet es una plataforma de difución de eventos
                   alrededor del mundo y nuestro servicio es utilizado
                   por grandes compañias, universidades entre otros.</p>
            </div>
        </div>
    </section>
    );
  }
}

export default EventDetail;

















