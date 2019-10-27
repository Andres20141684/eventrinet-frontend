import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CreateEventStep3 extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          values: [{ value: null }],
          items: [], 
          text: '' ,
          bannTop : BannerTop,
          bannBot : BannerBottom, 
          };
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    

  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          value={el.value || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i].value = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState(prevState => ({
      values: [...prevState.values, { value: null }]
    }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
   createFormPhase() {        
    return this.state.values.map((el, index) => (
        <div class="panel-group" key={index} >
                    <div class="panel-heading">Fase {index + 1}</div>
                    <button style={{float:'right'}}  onClick={this.removeClick.bind(this, index)}> Eliminar Fase</button>                    
                    <div class="panel panel-default">
                        <div class="panel-heading">General</div>
                        <div class="panel-body">
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col>
                            <label> Actividad </label>
                            </Col>
                            <Col sm={10}>
                            <input  placeholder="Actividad" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col>
                            <label> Descripcion </label>
                            </Col>
                            <Col sm={10}>
                            <input  placeholder="Descripcion" />
                            </Col>
                        </Form.Group>
                    </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Configuracion de evaluacion</div>
                        <div class="panel-body">
                        <Form.Check
                            type="radio" inline
                            label="Si"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio" inline
                            label="No"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                        />
                    </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Campos personalizados</div>
                        <div class="panel-body">
                        
                        </div>
                    </div>
                </div>       
    ));

    }
}
export default CreateEventStep3;