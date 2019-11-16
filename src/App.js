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
      initialComponent: NewIni,
      initialComponentProps:{},
      xd: null,
      pathGottenbyDunkUser:"",
      Usuario:null,
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

  componentWillMount(){
    console.log("App->WillMount", this.props);
    this.getDataUser();
  } 
  componentDidMount(){
    console.log("App->DidMount", this.state);
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
