import React from "react";
import Form from 'react-bootstrap/Form'
class RadioButton extends React.Component{
    


    onRadioButtonChange =(val) =>{
        console.log("val---",val)
        if(val == "Si"){
            console.log("rbsi",this.props.seleccion)
            this.props.seleccion.push(3)
        }else if(val === "Quizas"){
            //console.log("rbsi",this.props.seleccion)
            this.props.seleccion.push(2)
        }else if(val === "No"){
            //console.log("rbsi",this.props.seleccion)
            this.props.seleccion.push(1)
        }else{
            //console.log("rbsi",this.props.seleccion)
            this.props.seleccion.push(0)
        }
    }
    
    render() {
    return(
    <div class="form-check form-check-inline">                    
    <div>{/*
        <Form.Check
            type="radio" inline
            checked={isSelected}//estado presionado o no
            label="Si"//nombre
            //name="formHorizontalRadios_1"
            //id="rdCategry"
            onClick={onRadioButtonChange}//cambiar el estado
        />*/}
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id={this.props.index+"Si"} 
        value={3} onChange={()=>this.onRadioButtonChange("Si")}/>
        <label class="form-check-label" >Si</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id={this.props.index+"Quizas"}
        value={2} onChange={()=>this.onRadioButtonChange("Quizas")}/>
        <label class="form-check-label" >Quizas</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id={this.props.index+"No"} 
        value={1} onChange={()=>this.onRadioButtonChange("No")}/>
        <label class="form-check-label" >No</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id={this.props.index+"Conflicto"} 
        value={0} onChange={()=>this.onRadioButtonChange("Conflicto")}/>
        <label class="form-check-label" >Conflicto</label>
        </div>
        </div>
    </div>
)
}
}

export default RadioButton;