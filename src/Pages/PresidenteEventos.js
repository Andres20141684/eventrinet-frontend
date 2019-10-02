import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import AsignarEvaluadorTable from '../Components/Jtable/AsignarEvaluadorTable';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
/*AQUI  ASIGNO EVALUADORES*/




function FillTable(){
    return ( 
    <div>
        <button style={{float:'right'}}>Crear evento</button>
        <br></br>
        <br></br>
        <div>
            <AsignarEvaluadorTable/>
        </div>
    </div>
    )
}
function Botones(){
    return ( 
    <div>
         <h2><br/></h2>
                    <h3>
                    <button style={{float:'left'}}>Atras</button>
                    <button style={{float:'right'}}>Guardar</button>
                    <br/><br/>
                    </h3>
    </div>
    )
}
function BodyPanel(){
    return ( 
    <div>
        <br/>
        <h1>Asigna los evaluadores a las propuestas, edita las fases o aprueba las propuestas de un evento<br/><br/></h1>
        <br/>
    </div>
    )
}
function MainTittle(){
    return ( 
    <div>
        <h1><font size="33">Presidente - Eventos</font><br/><br/></h1>
    </div>
    )
}
class PresidenteEventos extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
    }
   
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos1 ={ //state is by default an object
            chupetinesGA: [
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''},
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''},
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''}
            ]
         }
         var datos2 ={ //state is by default an object
            chupetinesGA: [
               { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com',opt: ''},
               { id: 2, name: 'Ali', age: 19, email: 'ali@email.com'    ,opt: ''},
               { id: 3, name: 'Saad', age: 16, email: 'saad@email.com'  ,opt: ''},
              ]
         }
        return(
            <div> 
                <this.state.bannTop />
                /*AQUI DEBO RECIBIR EL NOMBRE DEL EVENTO AL CUAL ASIGNAR EVALUADORES*/
                
                <MainTittle/>
                <div class="container">
                    <div class="panel panel-default">

                        < BodyPanel/>

                        
                        <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                                <TabList>
                                    <Tab>Eventos por iniciar</Tab>
                                    <Tab>Eventos en fase de evaluacion</Tab>
                                </TabList>
                                <TabPanel>
                                    <div class="container">
                                    <div class="panel panel-default">
                                        < AsignarEvaluadorTable data ={datos1}/>
                                    </div></div>
                                </TabPanel>
                                <TabPanel> 
                                <div class="container">
                                <div class="panel panel-default">
                                    < AsignarEvaluadorTable data ={datos2}/> 
                                </div></div>
                                </TabPanel>
                            </Tabs>
                        <Botones/>
                    </div>
                
                   
                </div>
                <br/><br/>
                <this.state.bannBot/>
            </div>
        );
    }
}


export default PresidenteEventos;

