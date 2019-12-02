import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import ArrayOfChips from './ArrayOfChips';
import '../../../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/style_sheets.css';
import JUpload from '../../Special/JUpload';
import JMap from '../../Special/JMap';


export default class StepOne extends React.Component {
  constructor(props){
    super(props);
    this.state={
      auxCat:'',
      currentLugar:"PUCP",
    }
    this.renderJMap=this.renderJMap.bind(this);
    this.handleAuxChange=this.handleAuxChange.bind(this);
    this.handleJchange_Hackeo=this.handleJchange_Hackeo.bind(this);
  }

  handleAuxChange(e,str){
    this.setState({
      [str]:e.target.value
    })
    console.log(this.state)
  }
  componentWillMount(){
    this.setState({currentLugar:this.props.lugar});
  }
 
  handleJchange_Hackeo(e){
    console.log("*>*<*<*<*>*>*>**<*>*>*>*",e.target.value);
    var place = JSON.stringify(e.target.value);
    console.log("---------------->" ,e.target.value);
    //document.getElementById("id_name").value=e.target.value;
    this.setState({currentLugar:place});
    //var place2 = place.split("");
    /************ JIN DE MRDA RECUERDA NO TOCAR LA WADA DE ARMANDO ********** */
    this.props.handleChange({target:{value:place,name:"lugar"}});
  }
  renderInput(_value){
    return(<><input 
                    type="text" 
                    name='lugar'
                    class="form-control" 
                    id="id_place"
                    placeholder='Lugar del evento(igresala manualmente o con ayuda de googlemaps)'                
                    onChange={this.props.onChange}
                    value={_value}
                    maxLength="150"
                    readOnly={this.props.rol===1}
                    /></>);
  }
  renderJMap(_lugar){
    return(<JMap
              lugar={_lugar}
              mode={"event_creation"}
            />);
  }

  render () {
    return (
      <div>
        <div class="panel-group" style={styles.panel}>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Datos Generales</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md">
                <label >Nombre</label>
                <input 
                    type="text" 
                    name='nombre'
                    class="form-control" 
                    id="id_name"
                    placeholder='Nombre'              
                    onChange={this.props.handleChange}
                    value={this.props.nombre}
                    maxLength="45"
                    readOnly={this.props.rol===1}
                    autoFocus/>
                {this.props.nombre===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>}  
            </div>
            </Row>
            <Row>
            <div class="form-group col-md">
                <label>Descripcion</label>
                <textarea 
                    rows='7'
                    type="text" 
                    name='descripcion'
                    class="form-control" 
                    id="id_description"
                    placeholder='Descripcion'                  
                    onChange={this.props.handleChange}
                    value={this.props.descripcion}       
                    maxLength="750"
                    readOnly={this.props.rol===1}       
                    />
                  {this.props.descripcion===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>}  
            </div>
            </Row>
            <Row>
            <div class="form-group col-md">
                <label >Lugar del evento</label>
                {/*this.renderInput(this.state.currentLugar)*/}
                    
                  {this.props.lugar===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>} 
                  <br/>
                  <JMap
                    lugar={this.props.lugar}
                    mode={this.props.rol===1?"event_visualization":"event_creation"}
                    onChange={this.handleJchange_Hackeo}
                  />
                  
            </div>
            </Row>
            <label >Fechas de la Realización del evento:</label><br/>  
            <Row>           
                  <div class="form-group col-md-6"> 
                  <label >Fecha Inicio</label>
                    <DatePicker
                      type="date"
                      selected={this.props.fechaIE}
                      minDate={new Date()}
                      maxDate={this.props.fechaFE!==''?this.props.fechaFE:null}
                      onChange={(e)=> this.props.handleChange2(e,"fIni")}
                      id="input-date"
                      name="date_in"
                      placeholder="date_in"
                      readOnly={this.props.rol===1}
                    />                
                  </div>
                  <div class="form-group col-md-5">
                      <label >Fecha Fin </label>
                        <DatePicker
                          style={{position:"absolute"}}
                          type="date"
                          selected={this.props.fechaFE}
                          minDate={this.props.fechaIE!==''?this.props.fechaIE:new Date()}
                          disabled={this.props.fechaIE===''?true:false}
                          onChange={(e)=> this.props.handleChange2(e,"fFin")}
                          id="input-date"
                          name="date_in"
                          placeholder="date_in"
                          readOnly={this.props.rol===1}
                        />                       
                  </div>
                  </Row>
                  {this.props.fechaFE===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>}
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorias</h1></div>
            <div class="panel-body">
              <div class="form-group col-md">
              <ArrayOfChips 
              auxLabel='auxCat'
              aux={this.state.auxCat} 
              handlechange={this.handleAuxChange} 
              lista={this.props.categorias} 
              handleadd={this.props.handleChange2} 
              tag="categorias" 
              label="descripcion"
              rol={this.props.rol}/>
              </div>
              {this.props.categorias.length===0?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>}  
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Imagen</h1></div>
          <Row>
          <div class="panel-body">
                <label style={{marginLeft:'15px'}}>Agrega la imagen del Evento:</label>
                <div class="row">
                  <div class="col-sm-8">
                    <JUpload
                      id_drop_zone="drop_zone_archivo"
                      onSuccesLoad={this.props.handleOnLoad}
                      formato="jpg"
                      maxTamanio={10}
                    />
                  </div>
                  <div class="col-sm-4">
                    <div class="imagen-port" 
                     style={{width: "94%"}}>
                      <img src={this.props.imagen} alt="event"/>
                    </div>
                  </div>                
                </div> 
          </div>
          </Row></div>
        </div>      
      </div>
    )
  }
}

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
