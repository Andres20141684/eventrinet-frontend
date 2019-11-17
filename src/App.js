import React, {Component} from 'react';
import BannerBottom_ from './Components/General/bannerBottom';
import './App.css'; 
import WorkingSpace from './Components/Special/WorkingSpace';
import NewIni from "./../src/Components/General/NewIni";
import EventDetail from './Components/EventDetail';
import SendProposal from './Components/SendProposal';
import AsignEvalPropuesta from './Pages/Asign_Eval_Propuest';
import Dashboard from './Components/Dashboard';
const Networking = require('./Network/Networking.js') ;


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      bannBot : BannerBottom_,
      workingSpace : WorkingSpace,
      msg: "Not Connected" ,
      initialComponent: SendProposal,
      initialComponentProps:{},
      xd: null,
      pathGottenbyDunkUser:"",
      Usuario:null,
    }
    this.getDataUser=this.getDataUser.bind(this);
    this.componentWillTryRedirect=this.componentWillTryRedirect.bind(this);
    
  }
  getDataUser(){
    console.log("App will get DataUser: ***");
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);      
    console.log("retrievedJson",retrievedJson)
    try{
      /** retirare estalinea despues ya que es redundante */
      this.state.initialComponentProps.idUser=retrievedJson.infoUsuario.idUsuario;
      this.state.initialComponentProps.Usuario=retrievedJson.infoUsuario;
      this.setState({idUser:retrievedJson.infoUsuario.idUsuario });
      this.setState({Usuario: retrievedJson.infoUsuario});
    }catch(e){
      console.error(e);
      console.error("no se encontro nada en el sessionStorage");
      this.setState({idUser: 0 });
      

    }
  }
  /*
      formato URL parametro para eventrinet.com
                
                https//:www.Eventrinet.com/?EventriEvents&idEvento=100

   */
  componentWillTryRedirect(busqueda){
    if(busqueda==='') {return};
    var split1 = busqueda.split('?');
    if(split1.lenght==1) {return};
    var split2 =split1[1].split('&');
    if (split2[0]=='EventriEvents'){
        var parameter = split2[1].split('=');
        if(parameter[0]=='idEvento'){
            var _idEvento= parseInt(parameter[1]);
            /** aqui networking busca los detalles del evento  y redirijo*/
            console.log("App-> idEvento=",_idEvento);
            Networking.NetworkMutation_JAchievingData(
              {
                methodPath: 'eventos/mostrar_evento',
                JsonToBack:{
                    idEvento: _idEvento
                },
              }
            ).then((value) => {
              console.log(value);
              if(value == null || value.succeed==false){
                console.error('FALLO FATAL');
                /************** si fallo mensaje de error************ */
              }else {
                 console.log('si hay algo:');
                //this.handleNextChildComponentChange(PropoMyProposals);
                // aligerando el javascript object
                try{
                  delete value.resultado;
                  delete value.tieneCameraRdy;
                  delete value.programaCompletado;
                  delete value.numeroPropuestas;
                  delete value.fases;}catch(e){console.log("Se removio lo que se pudo XD")}
                console.log('Evento modo ligero',value);
                this.state.initialComponentProps.evento=value;
                this.state.initialComponent=SendProposal;
                console.log('Dondoe toy',this.state.initialComponent);
              }
           });
        }
    }
  }
  componentWillMount(){
    console.log("App->WillMount");
    this.getDataUser();
    //capturo lo que quiero del evento
    //intento redireccion
    
    
  } 
  render() {
    
    return (
      <div>
        <div className="App">
          <div>
            <this.state.workingSpace 
              idUser={this.state.idUser}
              Usuario={this.state.Usuario}
              nextComponent={this.state.initialComponent}
              nextComponentProps = {this.state.initialComponentProps}
            />
          </div>
        </div>
        <this.state.bannBot/>
    </div>
  );}
}

export default App;
