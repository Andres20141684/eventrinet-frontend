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


export default class StepOne extends React.Component {
  constructor(){
    super();
    this.state={
      auxCat:'',
      imagen:'https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg',
    }
    this.handleAuxChange=this.handleAuxChange.bind(this)
    this.handleOnLoad=this.handleOnLoad.bind(this);
  }

  handleAuxChange(e,str){
    this.setState({
      [str]:e.target.value
    })
    console.log(this.state)
  }
  /** handle del subeArchivos XD */
  /*** pinshi Armando ...Glenn me dijo que te deje el para subir imagen en este step 
 *    tu ya ves lo que haces con el handleonload, aqui considera que ya esta el archivo listo para irse a la base de datos
 * porciaca lo guardo en el sateXD
*/
  handleOnLoad(result){
    this.setState(
      {imagen:result
    });
    console.log("Imagen->",result);
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
                {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/}  
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
                    maxLength="200"
                    readOnly={this.props.rol===1}       
                    />
                  {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/}  
            </div>
            </Row>
            <Row>
            <div class="form-group col-md">
                <label >Lugar</label>
                <input 
                    type="text" 
                    name='lugar'
                    class="form-control" 
                    id="id_place"
                    placeholder='Lugar'                
                    onChange={this.props.handleChange}
                    value={this.props.lugar}
                    maxLength="150"
                    readOnly={this.props.rol===1}
                    />
                  {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/}  
            </div>
            </Row>
            <label >Fechas de la Realizacion del evento:</label><br/>  
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
                    {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/}  
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
                       {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/} 
                  </div>
                  </Row>
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
              {/*this.props.lugar===''?<span class="error">Campo Obligatorio</span>:<br></br>*/}  
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Imagen</h1></div>
          <Row>
          <div class="panel-body">
                <label>Agrega la imagen del Evento:</label>
                <div class="row">
                  <div class="col-sm-8">
                    <JUpload
                      id="drop_zone"
                      onSuccesLoad={this.handleOnLoad}
                      formato="jpg"
                      maxTamanio={10}
                    />
                  </div>
                  <div class="col-sm-4">
                    <div class="imagen-port" 
                     style={{width: "94%"}}>
                      <img src={this.state.imagen} alt="event"/>
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
