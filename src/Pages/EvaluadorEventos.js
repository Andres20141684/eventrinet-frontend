
import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EvaluadorEventosTable from '../Components/Jtable/EvaluadorEventosTable';
import EvaluadorEventosEvaluarTable from '../Components/Jtable/EvaluadorEventosEvaluarTable';
import Row from 'react-bootstrap/Row';

import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
/*AQUI  ASIGNO EVALUADORES*/

function MainTittle(){
    return ( 
    <div>
    <div style={{marginLeft:15}}>
        <h1><br/>Evaluador - Eventos</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25,marginBottom:25}} ><h4>Asigna los evaluadores las propuestas</h4></div>
    </div>    
    )
}


function FillTable(){
    return ( 
    <div>
        <button style={{float:'right'}}>Crear evento</button>
        <br></br>
        <br></br>
        <div>
            <EvaluadorEventosTable/>
        </div>
    </div>
    )
}


class EvaluadorEventos extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
    }
   
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos1 ={ //state is by default an object
            chupetinesGA: [
               
               {  listaeventos: 'Datos1', Fecha_maxima: '21/03/2019', Tipo_Preferencia: 'Por Categoria' ,agregar_preferencia: ''},
               {  listaeventos: 'Datos1', Fecha_maxima: '21/03/2019', Tipo_Preferencia: 'Por Propuesta' ,agregar_preferencia: ''},
               {  listaeventos: 'Datos1', Fecha_maxima: '21/03/2019', Tipo_Preferencia: 'Por Categoria' ,agregar_preferencia: ''},
               {  listaeventos: 'Datos1', Fecha_maxima: '21/03/2019', Tipo_Preferencia: 'Por Categoria' ,agregar_preferencia: ''},
               {  listaeventos: 'Datos1', Fecha_maxima: '21/03/2019', Tipo_Preferencia: 'Por Categoria' ,agregar_preferencia: ''}
            ]
         }
         var datos2 ={ //state is by default an object
            chupetinesGA: [
                {  listaeventos: 'datos2', Fase_Actual_Fases_Totales: '03/09', calificado_Evaluador: 'Si' ,Fecha_limite: '21/03/2019',evaluar_fase: ''},
                {  listaeventos: 'datos2', Fase_Actual_Fases_Totales: '03/09', calificado_Evaluador: 'No' ,Fecha_limite: '21/03/2019',evaluar_fase: ''},
                {  listaeventos: 'datos2', Fase_Actual_Fases_Totales: '03/09', calificado_Evaluador: 'Si' ,Fecha_limite: '21/03/2019',evaluar_fase: ''}
            ]
         }
        return(
            <div> 
            <this.state.bannTop />
            <MainTittle/>
            <div class="container" >
                <div class="card">
                    <div class="card-body">
                        <div>
                            La modalidad de preferencia fue (por categoria)
                            <button class="mybutton" style={{float:'right'}}>Ver mas...</button>                        
                        </div>
                        <div>
                            Asignacion automatica
                            <button class="mybutton" style={{float:'right'}}>Aplicar</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div class ="panel-body">
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>Eventos a elegir Preferencias</Tab>
                            <Tab>Eventos a evaluar</Tab>
                        </TabList>
                        <TabPanel>
                            <div class="panel panel mypanel" >
                                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                                    <h3>Elige un evento y agrega tus preferencias</h3>
                                </div>
                                < EvaluadorEventosTable data ={datos1}/>
                            </div>
                        </TabPanel>
                        <TabPanel>  
                            <div class="panel panel mypanel" >
                                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                                    <h3>Elige un evento y evalua las propuestas asignadas</h3>
                                </div>
                                < EvaluadorEventosTable data ={datos2}/>
                            </div>        
                        </TabPanel>
                    </Tabs>
                    <div>
                        <button class="mybutton"style={{float:'left'}}>Atras</button>
                        <button class="mybutton"style={{float:'right'}}>Guardar</button>
                        <br/><br/>
                    </div>
                </div>
                </div>
                <this.state.bannBot/>
            </div>
        );
    }
}


export default EvaluadorEventos;

