import React, { Component } from 'react'
import Select from "react-dropdown-select";
import Chip from '@material-ui/core/Chip';
import Row from 'react-bootstrap/Row';

const Networking = require('../../../Network/Networking.js') ;
const options=[{id:0,nombre:'Juan    f',correo:'ret@pucp.pe'},{id:2,nombre:'Pepito',correo:'pepex@pucp.pe'},{id:1,nombre:'Cesar',correo:'ffff@pucp.pe'}]
const aux=[]
export default class Searchable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[],
            clearable:false,
            selectValues: [],
            labelField: "nombre", // el que se muestra en el select
            valueField: "idUsuario", //
            dropdownHeight: "100px",
            searchBy:'nombre', //busca por esa propiedad
            usuarios:[]
        }
        this.setValues=this.setValues.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.itemRenderer=this.itemRenderer.bind(this)
    }

    componentWillMount(){
        Networking.listar_usuarios().then((response)=>{
            this.setState({options:response.correos})
            console.log(response);
          })
          .catch( (err) =>{
            console.log("error en conexión");
            console.log(err);
          })
    }

    itemRenderer = ({ item, itemIndex, props, state, methods }) => (
        <div key={item[this.state.valueField]} onClick={() => methods.addItem(item)}>
          <div style={{ margin: "10px" }}>
            <label>{item[this.state.labelField]}</label>
            <br/>
            <label>{item.correo}</label>
          </div>
        </div>
      );

    setValues = selectValues => this.setState({ selectValues:selectValues,clearable:true});

    

    handleSelect(){
        var user=[...this.state.usuarios];
        user.push(this.state.selectValues[0]);
        this.setState({usuarios:user,selectValues:[],clearable:false});
    }
    handleDelete(data){
        var chipData=[...this.state.usuarios]
        chipData=chipData.filter(chip => chip.idUsuario !== data.idUsuario)
        this.setState({usuarios:chipData})
    }
    filtradoOpciones(){
        aux=[...this.state.options]
        for(var i=0;i<this.state.usuarios.length;i++){
           aux=aux.filter(opt=>opt.correo!==this.state.usuarios.evaluadores[i].correo)
           console.log("Valor de aux: ",aux)
           console.log("Valor de options",this.state.options)
        }
        console.log(aux) 
     }
    
    render() {
        return (
            <div class="panel-body">
              <div class="form-group col-md">
              <div>
                <Row>
                <form onSubmit={e => { e.preventDefault(); }} style={{width:'100%'}} >
                    <div class="input-group mb">
                        <Select 
                            class="form-control" 
                            component={'span'} style={{fontSize:'18px', width: "350px"}} 
                            placeholder="Elige Ususario" 
                            options={this.state.options} 
                            noDataLabel="Usuario no encontrado"
                            onChange={values => this.setValues(values)}
                            dropdownHeight={this.state.dropdownHeight}
                            labelField={this.state.labelField}
                            valueField={this.state.valueField}
                            values={[...this.state.selectValues]}
                            //dropdownGap={5}
                            searchBy={this.state.searchBy}
                            clearable={this.state.clearable}
                            /*itemRenderer={
                                (item, itemIndex, props, state, methods) =>
                                    this.itemRenderer(item, itemIndex, props, state, methods)
                            }*/
                            />
                        </div> 
                        <div class="input-group-append">
                        <button 
                            class="btn btn-outline-secondary add"
                            variant="primary" 
                            type='email' 
                            onClick={this.handleSelect}
                            //disabled={props.tag!=='presidente'?false:props.lista.length===0?false:true}
                            style={{backgroundColor:"002D3D", borderTopRightRadius:'4px', borderBottomRightRadius:'4px'}}>Agregar</button>
                        </div>
                        <div>
                        <label>
                            Busqueda por:
                        </label>
                        <select
                            defaultValue={this.state.searchBy}
                            onChange={event => this.setState({ searchBy: event.target.value ,labelField:event.target.value})}
                        > 
                            <option value={'nombre'}>Nombre</option>
                            <option value={'correo'}>Correo</option>
                        </select>
                        </div>
                    </form>
                    {this.state.usuarios.map((data, index) => {
                    return (
                        <Chip
                        style={{fontSize:'16px'}}
                        key={index}
                        label={data.nombre}
                        onDelete={()=>this.handleDelete(data)}
                        />
                    );
                    })}
                </Row>
            </div> 
              </div>
            </div>
            
        )
    }
}
