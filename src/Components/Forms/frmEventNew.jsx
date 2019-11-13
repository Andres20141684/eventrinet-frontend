import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string } from 'prop-types';
import '../../styles/style_sheets.css'
import { thisExpression } from '@babel/types';
import OrganActiveEvents from '../../Pages/OrganActiveEvents';

const Networking = require('../../Network/Networking.js') ;
export default class EventNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idEvento:0,
            idUsuario:0,
            nombre:'',
            descripcion:'',
            fIni: '',
            fFin: '',
            lugar:'',
            rdCategry:true,
            rdPropuest:false,
            comiteOrganizacional:[],
            presidente:[],
            evaluadores:[],
            categorias:[],
            fases:[{idFase:0,secuencia:1,camposPerson:[{idCamposPEnun:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],criterios:[{idCriterio:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],reqArch:false,necesitaArchivo:0,reqEval:false,necesitaEvaluacion:0}],
            tieneCameraRdy:0,
            rdCamR:false,
            fCRIni:'',
            fCRFin:'',
            fechPref:new Date(),            
            fechaMaxPref:'',
            numFases:0,
            preferencia:'',
            precios:0,
            numeroPropuestas:0,
            datajson:null,  
            form:frmCreateEvent,
            options:[],
            data_recived: {}

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
        this.handleChangeRadio=this.handleChangeRadio.bind(this)
        this.handlePrint=this.handlePrint.bind(this)
        this.DateFormat=this.DateFormat.bind(this)
        this.handleCheckB=this.handleCheckB.bind(this)
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this)
      }
      componentWillMount(){

        Networking.listar_usuarios().then((response)=>{ //Listar todos los ususarios activos
          this.setState({options:response.correos})
          console.log(response);
        })
        .catch( (err) =>{
          console.log("error en conexión");
          console.log(err);
        })


        this.state.data_recived=this.props.data_recived;
        console.log('Te lo dije');
        console.log(this.state.data_recived);
        this.setState(
          {idUsuario: this.state.data_recived.idOrganizador_nextProps}
        );
        
      }

      handleNextChildComponentChange(_nextChildComponent){
        console.log('redireccionando a ... ORGAN ACCTIVE evento');
          this.props.onNextChildComponentChange(_nextChildComponent);  
      }
      handleClick = () => {
        this.handleNextChildComponentChange(OrganActiveEvents);
      }
      componentDidMount(){
        console.log(this.state.data_recived)
        var aux={}
        aux.idEvento=this.state.data_recived.id_evento_nextProps
        aux=JSON.stringify(aux)
        if(this.state.data_recived.id_evento_nextProps!==0){
          console.log("<<<<<<<<<<<<<<<<<     JSONNNNNNN", aux);
          Networking.ShowEvent(aux).then(
            (response)=>{
              console.log(response);
              this.setState({
                idEvento:this.state.data_recived.id_evento_nextProps,
                nombre:response.nombre,
                descripcion:response.descripcion,
                fIni: new Date(response.fechaIni),
                fFin: new Date(response.fechaFin),
                lugar:response.lugar,
                rdCategry:response.preferencia==='CATEGORIA'?true:false,
                rdPropuest:response.preferencia==='PROPUESTA'?true:false,
                comiteOrganizacional:response.comiteOrganizacional,
                presidente:response.presidente,
                evaluadores:response.evaluadores,
                categorias:response.categorias,
                tieneCameraRdy:response.tieneCameraRdy,
                rdCamR:response.tieneCameraRdy===1?true:false,
                fechPref:new Date(response.fechaMaxPref),            
              })
              if(response.fases.length!==0 && response.tieneCameraRdy===1){
                const aux=response.fases.pop();
                this.setState({
                  fCRIni:new Date(aux.fechaFaseIni),
                  fCRFin:new Date(aux.fechaFaseFin),
                })
              }
              if(response.fases.length!==0){
                console.log(response.fases)
                var auxfases=[]
                for(var i=0;i<response.fases.length;i++){
                  auxfases[i]=JSON.parse(JSON.stringify(response.fases[i]));
                  auxfases[i].faseIni=new Date(response.fases[i].fechaFaseIni);
                  auxfases[i].faseFin=new Date(response.fases[i].fechaFaseFin);
                  auxfases[i].faseEvalIni=new Date(response.fases[i].fechaEvalIni)
                  auxfases[i].reqArch=auxfases[i].necesitaArchivo===1?true:false;
                  auxfases[i].reqEval=auxfases[i].necesitaEvaluacion===1?true:false;
                  auxfases[i].numEvaluadores=response.fases[i].numEvaluadores.toString();
                  for(var j=0;j<response.fases[i].camposPerson.length;j++){
                    auxfases[i].camposPerson[j].obli=auxfases[i].camposPerson[j].obligatorio===1?true:false;
                  }
                }
                this.setState({
                  fases:auxfases
                })
              }
              console.log(auxfases)

            })
            .catch( (err) =>{
              console.log("error en conexión");
              console.log(err);
            })
        }
      }
      handleCheckB(event,str){
        this.setState({[str]:!this.state[str]})
      }
      
      handleChange2(value,label){
        this.setState({
          [label]:value
        })
        console.log(this.state[label])
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
              options={this.state.options}

              handleCheckB={this.handleCheckB}
              handleChange2={this.handleChange2}
              handleChangeRadio={this.handleChangeRadio}
              handleChange={this.handleChange} 
              handlePrint={this.handlePrint}
              onNextChildComponentChange={this.handleNextChildComponentChange}
              handleCancel={this.handleClick}
              />
          </div>
          
        )
        }


}