import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Organizador_HistoryventsTable from '../Components/Jtable/Organizador_HistoryventsTable';
import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';


function MyEvents(){
    return ( 
    <div>
        <button style={{float:'right'}}>Crear evento</button>
        <br></br>
        <br></br>
        <div>
        <table class="table"  styles={{width: '100%'}}>
            <thead>
            <tr>
                <th width="35%">Lista de eventos</th>
                <th width="30%">Prop. rec. -> En eval. -> Prog. comp. </th>
                <th width="12%">Editar</th>
                <th width="12%">Seg. de fases</th>
                <th width="8%">Publicar evento</th>
                <th width="4%">Cancelar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Comunity Day AWS</td>
                <td></td>
                <td><button  type="button" class="btn">Editar</button></td>
                <td><button  type="button" class="btn">Seguim</button></td>
                <td><button  type="button" class="btn">Publicar</button></td>
                <td><button  type="button" class="btn">Cancelar</button></td>
            </tr>
            <tr>
                <td>Sebiwis eventito +naki</td>
                <td></td>
                <td><button  type="button" class="btn">Editar</button></td>
                <td><button  type="button" class="btn">Seguim</button></td>
                <td><button  type="button" class="btn">Publicar</button></td>
                <td><button  type="button" class="btn">Cancelar</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    )
}
function RecordEvents(){
    return ( 
        <div>
            <button style={{float:'right'}}>Crear evento</button>
            <br></br>
            <br></br>
            <div>
            <table class="table"  styles={{width: '100%'}}>
                <thead>
                <tr>
                    <th width="75%">Lista de eventos</th>
                    <th width="25%">Reporte </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Comunity Day AWS</td>
                    <td><button  type="button" class="btn">(Download icon)</button></td>
                </tr>
                <tr>
                    <td>JinSSJ evento en Namekusey</td>
                    <td><button  type="button" class="btn">(Download icon)</button></td>
                    
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        )
}
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
        <h1>Gestion de eventos activos e históricos</h1><br/><br/>
        <br/>
    </div>
    )
}
function MainTittle(){
    return ( 
    <div>
        <h1><font size="33">Organizador - Eventos</font><br/><br/></h1>
    </div>
    )
}
class Organizador_ActiveEvents extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
      }
      
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos2 ={ //state is by default an object
            chupetinesGA: [
               { listaEventos: 'WaWaWasifsifsWaWasifsifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'}
            ]
         }
         var datos1 ={ //state is by default an object
            chupetinesGA: [
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'}
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
                                <Tab>Eventos activos</Tab>
                                <Tab>Historial de eventos</Tab>
                            </TabList>
                            <TabPanel>
                                <Organizador_HistoryventsTable data ={datos2}/> 
                            </TabPanel>
                            <TabPanel> 
                                
                                
                                < Organizador_ActiveEventsTable data ={datos1}/>
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


export default Organizador_ActiveEvents;

