import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string } from 'prop-types';
const Networking = require('../../Network/Networking.js') ;

export default class EventNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            fIni: new Date(),
            fFin: '',
            lugar:'',
            rdCategry:false,
            rdPropuest:false,
            comiteOrganizacional:[],
            presidente:[],
            evaluadores:[],
            categorias:[],
            fases:[{secuencia:1,camposPerson:[],criterios:[],reqArch:false,reqEval:false}],
            tieneCameraRdy:0,
            rdCamR:false,
            fCRIni:new Date(),
            fCRFin:'',
            fechPref:new Date(),            
            fechaMaxPref:'',
            numFases:'',
            preferencia:'',
            precios:0,
            aux: frmCreateEvent     

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
        this.handleChangeRadio=this.handleChangeRadio.bind(this)
        this.handlePrint=this.handlePrint.bind(this)
        this.DateFormat=this.DateFormat.bind(this)
        this.handleCheckB=this.handleCheckB.bind(this)
      }

      handleCheckB(event,str){
        this.setState({[str]:!this.state[str]})
      }
      handleChange2(value,label){
        this.setState({
          [label]:value
        })
        console.log(this.state)
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });  
      }

      handleChangeRadio(event,str) {
        const target = event.target;
        const checked = target.checked;
        const id = target.id;

        this.setState({
          [id]: checked,
          [str]:false
        });  
      }

      DateFormat(date,json,tag,tag2){
        let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
        json[tag]=aux
        //delete json[tag2]
      }

      handlePrint(event){
        let auxjson={}
        auxjson=this.state
        delete auxjson["aux"]
        
        if(auxjson.rdCategry===true){
          auxjson.preferencia="CATEGORIA"
        }else{
          auxjson.preferencia="PROPUESTA"
        }
        delete auxjson.rdCategry
        delete auxjson.rdPropuest

        if(auxjson.rdCamR===true){
          auxjson.tieneCameraRdy=1
          let addPhase={nombre:"Camera Ready",secuencia:this.state.fases.length+1}
          this.DateFormat(auxjson.fCRIni,addPhase,"fechaFaseIni",null)
          this.DateFormat(auxjson.fCRFin,addPhase,"fechaFaseFin",null)
          auxjson.fases.push(addPhase)
        }
        auxjson.numFases=this.state.fases.length

        this.DateFormat(this.state.fIni,auxjson,"fechaIni","fIni")
        this.DateFormat(this.state.fFin,auxjson,"fechaFin","fFin")
        this.DateFormat(this.state.fechPref,auxjson,"fechaMaxPref","fechPref")

        console.log(auxjson);
        var dataA=JSON.stringify(auxjson)
        console.log(dataA);


        console.log("Envio json");
        Networking.insertNewEvent(dataA).then(
          (response)=>{
            console.log(response);
          })
          .catch( (err) =>{
            console.log("error en conexión");
            console.log(err);
          })
      }

      

      render() {    
        return (
          <div className='container'>

              <this.state.aux 
              nombre={this.state.nombre} 
              descripcion={this.state.descripcion}
              lugar={this.state.lugar}
                
              rdCategry={this.state.rdCategry}
              rdPropuest={this.state.rdPropuest}


              categorias={this.state.categorias}
              evaluadores={this.state.evaluadores}
              presidente={this.state.presidente}
              comite1={this.state.comiteOrganizacional}
              fases={this.state.fases}
              
              fechaIE={this.state.fIni}
              fechaFE={this.state.fFin} 
              
              fechPref={this.state.fechPref}

              rdCamR={this.state.rdCamR}
              fCRIni={this.state.fCRIni}
              fCRFin={this.state.fCRFin}

              handleCheckB={this.handleCheckB}
              handleChange2={this.handleChange2}
              handleChangeRadio={this.handleChangeRadio}
              handleChange={this.handleChange} 
              handlePrint={this.handlePrint}
              />
          </div>
          /*
          
          <React.Fragment>            
          <form onSubmit={this.handleSubmit}>

            <Step1 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              email={this.state.email}
            />
            <Step2 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              username={this.state.username}
            />
            <Step3 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              password={this.state.password}
            />       
        
          </form>
          </React.Fragment>*/
        )
        }


}