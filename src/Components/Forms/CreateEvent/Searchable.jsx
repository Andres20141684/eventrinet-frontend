import React, { Component } from 'react'
import Select from "react-dropdown-select";
import Chip from '@material-ui/core/Chip';
import Row from 'react-bootstrap/Row';


export default class Searchable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clearable:false,
            selectValues: [],
            labelField: "nombre", // el que se muestra en el select
            valueField: "idUsuario", // 
            dropdownHeight: "100px",
            searchBy:'nombre', //busca por esa propiedad
            usuarios:[],
            filterList:[],
        }
        this.setValues=this.setValues.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    componentWillMount(){
        this.setState({usuarios:this.props.lista,filterList:this.props.options})
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevState.usuarios!==this.state.usuarios){
            this.filtradoOpciones()
        }
        if(prevState.selectValues!==this.state.selectValues && this.state.selectValues.length===0){
            this.setState({clearable:false})
        }
    }

    setValues = selectValues => this.setState({ selectValues:selectValues,clearable:true});

    handleSelect(){
        if(this.state.selectValues.length!==0){
            var user=[...this.state.usuarios];
            user.push(this.state.selectValues[0]);
            this.setState({usuarios:user,selectValues:[],clearable:false});
            this.props.handleadd(user,this.props.tag);
        }
    }
    handleDelete(data){
        var chipData=[...this.state.usuarios]
        chipData=chipData.filter(chip => chip.idUsuario !== data.idUsuario)
        this.setState({usuarios:chipData})
        this.props.handleadd(chipData,this.props.tag);
    }
    filtradoOpciones(){
        var aux=[...this.state.filterList]
        for(var i=0;i<this.state.usuarios.length;i++){
           aux=aux.filter(opt=>opt.correo!==this.state.usuarios[i].correo)
           console.log("Valor de aux: ",aux)
           console.log("Valor de options",this.props.options)
        }
        this.setState({filterList:aux})

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
                            options={this.props.options} 
                            noDataLabel="Usuario no encontrado"
                            onChange={values => this.setValues(values)}
                            dropdownHeight={this.state.dropdownHeight}
                            labelField={this.state.labelField}
                            valueField={this.state.valueField}
                            values={[...this.state.selectValues]}
                            disabled={this.props.tag!=='presidente'?false:this.props.lista.length===0?false:true}
                            searchBy={this.state.searchBy}
                            clearable={this.state.clearable}
                            />
                        </div> 
                        <div class="input-group-append">
                        <button 
                            class="btn btn-outline-secondary add"
                            variant="primary" 
                            type='email' 
                            onClick={this.handleSelect}
                            disabled={this.props.tag!=='presidente'?false:this.props.lista.length===0?false:true}
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
                        label={data.correo}
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
