import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'
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

class ActiveEvents extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
      }
    render(){
        return(
        <div> 
            <this.state.bannTop />
            <h1>Mis eventos - Organizador</h1>
            <div class="container">
            <div class="panel panel-default">
                <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                    <TabList>
                        <Tab>Eventos activos</Tab>
                        <Tab>Historial de eventos</Tab>
                    </TabList>
                    <TabPanel> <MyEvents/> </TabPanel>
                    <TabPanel> <RecordEvents/> </TabPanel>
                </Tabs>
                </div>
            </div>
            <this.state.bannBot/>
        </div>
        );
    }
}


export default ActiveEvents;

