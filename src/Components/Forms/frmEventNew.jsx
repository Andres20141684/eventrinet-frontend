import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string, element } from 'prop-types';
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
            fases:[{idFase:0,nombre:'',descripcion:'',faseIni:'',faseFin:'',faseEvalIni:'',faseEvalPresiIni:'',secuencia:1,camposPerson:[{idCamposPEnun:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],criterios:[{idCriterio:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],reqArch:false,necesitaArchivo:0,reqEval:false,necesitaEvaluacion:0,reqEnt:false,necesitaEntregable:0}],
            tieneCameraRdy:0,
            rdCamR:false,
            fCRIni:'',
            fCRFin:'',
            fechPref:'',            
            fechaMaxPref:'',
            numFases:0,
            preferencia:'',
            precios:0,
            imagen: 'https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg',
            numeroPropuestas:0,
            datajson:null,  
            form:frmCreateEvent,
            options:[],
            data_recived: {},
            CategoriasNulo:0,
            EsVaciocomiteOrganizacional:0,
            EsVaciopresidente:0,
            EsVacioevaluadores:0,
            ChangeFases:0,
            form1Completo:false,
            form2Completo:false,
            form3Completo:false,
            formFaseCompleto:false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2=this.handleChange2.bind(this)
        this.handleChangeRadio=this.handleChangeRadio.bind(this)
        this.handlePrint=this.handlePrint.bind(this)
        this.DateFormat=this.DateFormat.bind(this)
        this.handleCheckB=this.handleCheckB.bind(this)
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this)
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.validacion=this.validacion.bind(this)
        this.handleOnLoad=this.handleOnLoad.bind(this)
      }
      componentWillMount(){

        Networking.listar_usuarios().then((response)=>{ //Listar todos los ususarios activos
          response.correos.map((element,index)=>(
            element.show=element.nombre+"\n\r"+element.correo
          ))
          this.setState({options:response.correos})
          console.log(response);
        })
        .catch( (err) =>{
          console.log("error en conexión");
          console.log(err);
        })


        this.state.data_recived=this.props.data_recived;
        console.log(this.state.data_recived);
        this.setState(
          {idUsuario: this.state.data_recived.idOrganizador_nextProps}
        );
        
      }

      handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }

      handleNextChildComponentChange(_nextChildComponent){
          this.props.onNextChildComponentChange(_nextChildComponent);  
      }

      validacion(){
        if(this.state.nombre!=='' && this.state.descripcion!=='' && this.state.lugar!==''
        && this.state.fIni!=='' && this.state.fFin!=='' && this.state.CategoriasNulo==1){
          this.setState({form1Completo:true})
        }
        else{
          this.setState({form1Completo:false})
        }
        if(this.state.EsVaciocomiteOrganizacional==1 && this.state.EsVaciopresidente==1 && this.state.EsVacioevaluadores==1){
          this.setState({form2Completo:true})
        }
        else{
          this.setState({form2Completo:false})
        }


        for (var index = 0; index <this.state.fases.length; index++) {
            if(this.state.fases[index].reqEval===false){
              if(this.state.fases[index].nombre!=='' && this.state.fases[index].descripcion!=='' 
              && this.state.fases[index].faseIni!=='' && this.state.fases[index].faseFin!==''){
                this.setState({formFaseCompleto:true})
              }
              else{
                this.setState({formFaseCompleto:false})
                break
              }
            }
            else{
              if(this.state.fases[index].nombre!=='' && this.state.fases[index].descripcion!=='' 
              && this.state.fases[index].faseIni!=='' && this.state.fases[index].faseFin!=='' && this.state.fases[index].faseEvalPresiIni!=='' && this.state.fases[index].faseEvalIni!==''){
                this.setState({formFaseCompleto:true})
              }
              else{
                this.setState({formFaseCompleto:false})
                break
              }
            }
        }
        
        if(this.state.rdCamR===false){
          if(this.state.formFaseCompleto===true && this.state.fechPref!==''){
            this.setState({form3Completo:true})
          }
          else{
            this.setState({form3Completo:false})
          }
        }
        else{
          if(this.state.formFaseCompleto===true && this.state.fechPref!==''
          && this.state.fCRIni!=='' && this.state.fCRFin!==''){
            this.setState({form3Completo:true})
          }
          else{
            this.setState({form3Completo:false})
          }
        }
      }

      componentDidUpdate(prevProps, prevState){
        if(prevState.nombre!==this.state.nombre){
          this.validacion()
        }
        if(prevState.lugar!==this.state.lugar){
          this.validacion()
        }
        if(prevState.descripcion!==this.state.descripcion){
          this.validacion()
        }
        if(prevState.CategoriasNulo!==this.state.CategoriasNulo){
          this.validacion()
        }
        if(prevState.EsVaciocomiteOrganizacional!==this.state.EsVaciocomiteOrganizacional){
          this.validacion()
        }
        if(prevState.EsVaciopresidente!==this.state.EsVaciopresidente){
          this.validacion()
        }
        if(prevState.EsVacioevaluadores!==this.state.EsVacioevaluadores){
          this.validacion()
        }
        if(prevState.ChangeFases!==this.state.ChangeFases){
          this.validacion()
        }
        if(prevState.fechPref!=this.state.fechPref){
          this.validacion()
        }
        if(prevState.fases!==this.state.fases){
          this.validacion()
        }
        if(prevState.rdCamR!=this.state.rdCamR){
          this.validacion()
        }
        if(prevState.fCRIni!=this.state.fCRIni){
          this.validacion()
        }
        if(prevState.fCRFin!=this.state.fCRFin){
          this.validacion()
        }
        if(prevState.formFaseCompleto!=this.state.formFaseCompleto){
          this.validacion()
        }
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
          Networking.ShowEvent(aux).then(
            (response)=>{
              console.log(response);
              this.setState({
                idEvento:this.state.data_recived.id_evento_nextProps,
                nombre:response.nombre,
                descripcion:response.descripcion,
                fIni: new Date(response.fechaIni.split("-")),
                fFin: new Date(response.fechaFin.split("-")),
                lugar:response.lugar,
                rdCategry:response.preferencia==='CATEGORIA'?true:false,
                rdPropuest:response.preferencia==='PROPUESTA'?true:false,
                comiteOrganizacional:response.comiteOrganizacional,
                presidente:response.presidente,
                evaluadores:response.evaluadores,
                categorias:response.categorias,
                tieneCameraRdy:response.tieneCameraRdy,
                rdCamR:response.tieneCameraRdy===1?true:false,
                fechPref:new Date(response.fechaMaxPref.split("-")),            
              })
              if(response.imagen!==null){
                this.setState({imagen:response.imagen})
              }
              if(response.fases.length!==0 && response.tieneCameraRdy===1){
                const aux=response.fases.pop();
                this.setState({
                  fCRIni:new Date(aux.fechaFaseIni.split("-")),
                  fCRFin:new Date(aux.fechaFaseFin.split("-")),
                })
              }
              if(response.fases.length!==0){
                console.log(response.fases)
                var auxfases=[]
                for(var i=0;i<response.fases.length;i++){
                  auxfases[i]=JSON.parse(JSON.stringify(response.fases[i]));
                  auxfases[i].faseIni=new Date(response.fases[i].fechaFaseIni.split("-"));
                  auxfases[i].faseFin=new Date(response.fases[i].fechaFaseFin.split("-"));
                  auxfases[i].faseEvalIni=new Date(response.fases[i].fechaEvalIni.split("-"));
				          auxfases[i].faseEvalPresiIni=new Date(response.fases[i].fechaEvalPresiIni.split("-"));
                  auxfases[i].reqArch=auxfases[i].necesitaArchivo===1?true:false;
                  auxfases[i].reqEval=auxfases[i].necesitaEvaluacion===1?true:false;
                  auxfases[i].reqEnt=auxfases[i].necesitaEntregable===1?true:false;
                  auxfases[i].numEvaluadores=response.fases[i].numEvaluadores.toString();
                  for(var j=0;j<response.fases[i].camposPerson.length;j++){
                    auxfases[i].camposPerson[j].obli=auxfases[i].camposPerson[j].obligatorio===1?true:false;
                  }
                }
                this.setState({
                  fases:auxfases
                })
              }
              this.setState({form1Completo:true,form2Completo:true,form3Completo:true,EsVaciocomiteOrganizacional:1,EsVacioevaluadores:1,EsVaciopresidente:1,CategoriasNulo:1})
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
      
      handleOnLoad(result){
        this.setState(
          {imagen:result
        });
        console.log("Imagen->",result);
      }

      handleChange2(value,label){
        this.setState({
          [label]:value
        })
        this.validacion()
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });  
        this.validacion()
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
        delete auxjson.options;
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
              imagen={this.state.imagen}
                
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

              form1Completo={this.state.form1Completo}
              form2Completo={this.state.form2Completo}
              form3Completo={this.state.form3Completo}
              formFaseCompleto={this.state.formFaseCompleto}

              datajson={this.state.datajson}
              options={this.state.options}

              handleCheckB={this.handleCheckB}
              handleChange2={this.handleChange2}
              handleChangeRadio={this.handleChangeRadio}
              handleChange={this.handleChange} 
              handlePrint={this.handlePrint}
              onNextChildComponentChange={this.handleNextChildComponentChange}
              onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
              handleCancel={this.handleClick}
              handleOnLoad={this.handleOnLoad}

              rol={this.props.data_recived.rol}
              />
          </div>
          
        )
        }


}