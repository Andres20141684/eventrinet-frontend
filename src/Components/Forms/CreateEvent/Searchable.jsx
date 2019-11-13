import React, { Component } from 'react'
import Select from "react-dropdown-select";
import Chip from '@material-ui/core/Chip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/style_sheets.css'

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
        var aux=[...this.props.options]
        for(var i=0;i<this.state.usuarios.length;i++){
           aux=aux.filter(opt=>opt.correo!==this.state.usuarios[i].correo)
           console.log("Valor de aux: ",aux)
           console.log("Valor de options",this.props.options)
        }
        this.setState({filterList:aux})

     }
    
    render() {
        return (
            <div class="panel-body" style={{paddingLeft:'0px'}}>
              <div class="form-group col-md" style={{paddingLeft:'0px'}}>
              <div>
                <Row>
                <form onSubmit={e => { e.preventDefault(); }} style={{width:'100%',paddingLeft:'0px'}} >
                    <div class="input-group mb">
                        <Col xs={12} md={8} style={{padding:'0px'}}>
                            <Select 
                                class="form-control" 
                                component={'span'} style={{fontSize:'18px'}} 
                                placeholder="Elige Ususario" 
                                options={this.state.filterList} 
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
                        </Col>
                        <Col xs={6} md={3} style={{float:'left',padding:'0px'}}>
                        <div class="input-group-append">
                        <button 
                             class="btn btn-primary add"
                            variant="primary" 
                            type='email' 
                            onClick={this.handleSelect}
                            disabled={this.props.tag!=='presidente'?false:this.props.lista.length===0?false:true}
                            style={{backgroundColor:"002D3D", borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px' ,borderTopRightRadius:'4px', borderBottomRightRadius:'4px',height:'36px'}}
                        >Agregar</button>
                        </div>
                        </Col>
                    </div> 
                        
                        <div style={{paddingTop:'15px',paddingLeft:'15px'}}>
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
