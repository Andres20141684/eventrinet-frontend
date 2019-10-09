import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import AsignarEvaluadorTable from '../Components/Jtable/AsignarEvaluadorTable';
import PresiCalificacionFinalPapersTable from '../Components/Jtable/PresiCalificacionFinalPapersTable';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
/*AQUI  ASIGNO EVALUADORES*/



function Botones(){
    return ( 
    <div>
         <h2><br/></h2>
                    <h3>
                    <button class="mybutton" style={{float:'left'}}>Atras</button>
                    <button class="mybutton" style={{float:'right'}}>Guardar</button>
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
class PresidentEvents extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
    }
   
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos1 ={ //state is by default an object
            chupetinesGA: [
                { listaEventos: 'WasifWasifWasifWasifWasif',
                 propAsignadas: '1/2', 
                 iniEval: 21, 
                 opt1: '', opt: ''},
                 { listaEventos: 'WasifWasifWasifWasifWasif',
                 propAsignadas: '1/2', 
                 iniEval: 21, 
                 opt1: '', opt: ''},
                 { listaEventos: 'WasifWasifWasifWasifWasif',
                 propAsignadas: '1/2', 
                 iniEval: 21, 
                 opt1: '', opt: ''}
               ]
         }
         var datos2 ={ //state is by default an object
            chupetinesGA: [
               { listaEventos: 'WasifWasifWasifWasifWasif', 
               fases: '1/2', 
               fechalimite: 21, 
               calEva: 'wasif@email.com',
               calPresi:'Si',
               opt: ''},
               { listaEventos: 'WasifWasifWasifWasifWasif', fases: '1/2', fechalimite: 19, calEva: 'ali@email.com' ,calPresi:'Si'   ,opt: ''},
               { listaEventos: 'WasifWasifWasifWasifWasif', fases: '1/2', fechalimite: 16, calEva: 'saad@email.com' ,calPresi:'Si' ,opt: ''},
              ]
         }
        return(
            <div> 
                <this.state.bannTop />
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
                                    
                                        < AsignarEvaluadorTable />
                                       
                                </TabPanel>
                                <TabPanel> 
                                    < PresiCalificacionFinalPapersTable/> 
                                   
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


export default PresidentEvents;

