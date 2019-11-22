import React, {Component} from 'react';
import BannerBottom_ from './Components/General/bannerBottom';
import './App.css'; 
import WorkingSpace from './Components/Special/WorkingSpace';
import NewIni from "./../src/Components/General/NewIni";
import EventDetail from './Components/EventDetail';

import AsignEvalPropuesta from './Pages/Asign_Eval_Propuest';
import Dashboard from './Components/Dashboard';
import SendProposal from './Components/SendProposal';
const Networking = require('./Network/Networking.js') ;


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      bannBot : BannerBottom_,
      URLworkingSpace: SendProposal,
      workingSpace : WorkingSpace,
      msg: "Not Connected" ,
      initialComponent: NewIni,   
      initialComponentProps:{},
      xd: null,
      pathGottenbyDunkUser:"",
      Usuario:null,
      searchEvent:0,
    }
    this.getDataUser=this.getDataUser.bind(this);
    
  }
  getDataUser(){
    console.log("App will get DataUser: ***");
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);      
    console.log("retrievedJson",retrievedJson)
    try{
      /** retirare estalinea despues ya que es redundante */
      this.state.initialComponentProps.Usuario=retrievedJson.infoUsuario;
      this.setState({idUser:retrievedJson.infoUsuario.idUsuario });
      this.setState({Usuario: retrievedJson.infoUsuario});
    }catch(e){
      console.error("no se encontro nada en el sessionStorage");
    }
  }
  /*
      formato URL parametro para eventrinet.com
                
                https//:www.Eventrinet.com/?EventriEvents&idEvento=253

  */
  shouldComponentUpdate(nextState,nextProps){
    if(nextState.initialComponent != this.state.initialComponent){return true;}
    return false;

  }
  componentWillMount(){
    console.log("App->WillMount");
    
    //capturo lo que quiero del evento
    //intento redireccion
    console.log("App-> props:",this.props.location);
    var busqueda = this.props.location.search;
    console.log("App-> intento de busqueda en ",busqueda);
    
    if(busqueda.lenght===0) { console.log("busqueda cero"); return};

    if(busqueda === undefined) { console.log("busqueda indefinido"); return};
    
    if(busqueda === null) { console.log("busqueda NULL"); return};
    
    try{
      var split1 = busqueda.split('?');
      console.log("App-> intento de busqueda.split('?')",split1);
      if(split1.lenght==1) {return};
      var split2 =split1[1].split('&');
      console.log("App-> intento de split1[1].split('&')",split2);
      if (split2[0]=='EventriEvents'){
          var parameter = split2[1].split('=');
          if(parameter[0]=='idEvento'){
              var _idEvento= parseInt(parameter[1]);
              /** aqui networking busca los detalles del evento  y redirijo*/
              console.log("App-> idEvento=",_idEvento);
              this.setState({searchEvent:_idEvento});
          }
      }
      if(split2[0]=='EventriProposals'){
        var parameter = split2[1].split('=');
        if(parameter[0]=='idEvento'){
            var _idEvento= parseInt(parameter[1]);
            /** aqui networking busca los detalles del evento  y redirijo*/
            console.log("App-> idEvento=",_idEvento);
            this.setState({searchEvent:_idEvento});
        }
    }   

    }catch(e){
      console.log("NO HABIA BUSQUEDA");
    }
    this.getDataUser();
    
  } 
  render() {
    
    return (
      <div>
        <div className="App">
          <div>
            {console.log("JUSTO ANTES DE IR AL WS ->",this.state)}
            <this.state.workingSpace 
              searchEvent={this.state.searchEvent}
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
