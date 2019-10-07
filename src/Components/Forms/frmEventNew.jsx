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
            fechaIC: new Date(),
            fechaFC: '',
            rdCategry:false,
            rdPropuest:false,
            comite1:[],
            presidente:[],
            evaluadores:[],
            categor:[],
            tieneCameraRdy:0,
            fechaMaxPref:'',
            numFases:1,
            preferencia:'',
            precios:0,
            aux: frmCreateEvent     

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleComiteadd=this.handleComiteadd.bind(this)
        this.handleDate=this.handleDate.bind(this)
        this.handleDate2=this.handleDate2.bind(this)
        this.handleCategoryadd=this.handleCategoryadd.bind(this)
        this.handleEvaluadoradd=this.handleEvaluadoradd.bind(this)
        this.handlePresidenteadd=this.handlePresidenteadd.bind(this)
        this.handleDate3=this.handleDate3.bind(this)
        this.handleDate4=this.handleDate4.bind(this)
        this.handleChangeRadio=this.handleChangeRadio.bind(this)
        this.handlePrint=this.handlePrint.bind(this)
      }

      handleDate(date){
        this.setState({
          fIni:date
        })
      }

      handleDate2(date){
        this.setState({
          fFin:date
        })
      }

      handleDate3(date){
        this.setState({
          fechaIC:date
        })
      }

      handleDate4(date){
        this.setState({
          fechaFC:date
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

      handleComiteadd(list){
        this.setState({
          comite1 : list
        })
      }
      handleCategoryadd(list){
        this.setState({
          categor : list
        })
      }
      handleEvaluadoradd(list){
        this.setState({
          evaluadores : list
        })
      }
      handlePresidenteadd(list){
        this.setState({
          presidente : list
        })
      }

      handleChangeRadio(event) {
        const target = event.target;
        const checked = target.checked;
        const id = target.id;

        this.setState({
          [id]: checked
        });  
      }

      handlePrint(event){
        let auxjson={}
        auxjson=this.state
        auxjson["categorias"]={}

        let fechA = this.state.fIni.getFullYear() + "-" + this.state.fIni.getMonth() + "-" + this.state.fIni.getDay() 
        auxjson["fechaIni"]=fechA

        let fechB =  this.state.fFin.getFullYear() + "-" + this.state.fFin.getMonth() + "-" + this.state.fFin.getDay() 
        auxjson["fechaFin"]=fechB

        auxjson["fechaMaxPref"]=fechB


        {this.state.categor.map((data, index) => {
          auxjson.categorias[index+1]=data.label
        })}

        let test=JSON.stringify(auxjson.categorias)
        console.log(test);

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
              handlePrint={this.handlePrint}

              handleChangeRadio={this.handleChangeRadio}
              rdCategry={this.state.rdCategry}
              rdPropuest={this.state.rdPropuest}
              evaluadores={this.state.evaluadores}
              presidente={this.state.presidente}
              handleEvaluadoradd={this.handleEvaluadoradd}
              handlePresidenteadd={this.handlePresidenteadd}
              handleCategoryadd={this.handleCategoryadd}
              categorias={this.state.categor}
              handleDate3={this.handleDate3}
              handleDate4={this.handleDate4}
              fechaIC={this.state.fechaIC}
              fechaFC={this.state.fechaFC}
              handleDate2={this.handleDate2}
              handleDate={this.handleDate}
              fechaIE={this.state.fIni}
              fechaFE={this.state.fFin}

              handleComiteadd={this.handleComiteadd}
              handleChange={this.handleChange} 
              nombre={this.state.nombre} 
              descripcion={this.state.descripcion}
              lugar={this.state.lugar}
              comite1={this.state.comite1}
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