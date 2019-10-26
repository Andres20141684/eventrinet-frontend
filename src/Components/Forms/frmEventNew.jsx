import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string } from 'prop-types';
import '../../styles/style_sheets.css'
import { thisExpression } from '@babel/types';
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
            fases:[{secuencia:1,camposPerson:[{obli: false, obligatorio:0}],criterios:[{obli: false, obligatorio:0}],reqArch:false,reqEval:false}],
            tieneCameraRdy:0,
            rdCamR:false,
            fCRIni:new Date(),
            fCRFin:'',
            fechPref:new Date(),            
            fechaMaxPref:'',
            numFases:0,
            preferencia:'',
            precios:0,
            numeroPropuestas:0,
            datajson:null,  
            form:frmCreateEvent  

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

      DateFormat(string,json,tag,tag2){
        const date=new Date(string)
        let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
        json[tag]=aux
        delete json[tag2]
      }

      handlePrint(event){
        var auxjson= JSON.parse(JSON.stringify(this.state));
        console.log(auxjson)

        delete auxjson.form;
        delete auxjson.datajson;
        
        auxjson.rdCategry===true? auxjson.preferencia="CATEGORIA": auxjson.preferencia="PROPUESTA";
        delete auxjson.rdCategry;
        delete auxjson.rdPropuest;

        auxjson.tieneCameraRdy=auxjson.rdCamR===true?1:0;
        this.DateFormat(auxjson.fCRIni,auxjson,"fechaIniCR","fCRIni")
        this.DateFormat(auxjson.fCRFin,auxjson,"fechaFinCR","fCRFin")

        auxjson.numFases=this.state.fases.length

        this.DateFormat(this.state.fIni,auxjson,"fechaIni","fIni")
        this.DateFormat(this.state.fFin,auxjson,"fechaFin","fFin")
        this.DateFormat(this.state.fechPref,auxjson,"fechaMaxPref","fechPref")

        const dataA=JSON.stringify(auxjson)
        console.log(dataA)
        this.setState({datajson:dataA})


        /*console.log("Envio json");
        Networking.insertNewEvent(dataA).then(
          (response)=>{
            console.log(response);
            window.location.assign("/organActiveEvents");
          })
          .catch( (err) =>{
            console.log("error en conexión");
            console.log(err);
          })*/
      }

      render() {    
        return (
          <div className='container'>
              <this.state.form
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

              datajson={this.state.datajson}

              handleCheckB={this.handleCheckB}
              handleChange2={this.handleChange2}
              handleChangeRadio={this.handleChangeRadio}
              handleChange={this.handleChange} 
              handlePrint={this.handlePrint}
              />
          </div>
        )
        }


}