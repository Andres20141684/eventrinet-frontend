
import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EvaluadorEventosTable from '../Components/Jtable/EvaluadorEventosTable';
import EvaluadorEventosEvaluarTable from '../Components/Jtable/EvaluadorEventosEvaluarTable';


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
                /*AQUI DEBO RECIBIR EL NOMBRE DEL EVALUADOR EL CUAL ELIGE PREFERENCIAS Y EVALUAS*/
                <h1><font size="33">Evaluador - Eventos</font><br/><br/></h1>
                <div class="container">
                <div class="panel panel-default">

                    <h1>Asigna los evaluadores a las propuestas<br/><br/></h1>
                    <h4>La modalidad de preferencia fue (por categoria)<button class="mybutton" style={{float:'right'}}>Ver mas...</button></h4>
                    <h4>Asignacion automatica<button class="mybutton" style={{float:'right'}}>Aplicar</button></h4>
                    <h4><br/></h4>
                    
                    <div class="container">
                        <div class="panel panel-default">
                            <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                                <TabList>
                                    <Tab>Eventos a elegir Preferencias</Tab>
                                    <Tab>Eventos a evaluar</Tab>
                                </TabList>
                                <TabPanel>
                                    <div class="container">
                                    <div class="panel panel-default">
                                        < EvaluadorEventosTable data ={datos1}/>
                                    </div></div>
                                </TabPanel>
                                <TabPanel> 
                                <div class="container">
                                <div class="panel panel-default">
                                    < EvaluadorEventosEvaluarTable data ={datos2}/> 
                                </div></div>
                                </TabPanel>
                            </Tabs>
                            </div>
                        </div>
                        <h2><br/></h2>
                        <h3>
                            <button class="mybutton"style={{float:'left'}}>Atras</button>
                            <button class="mybutton"style={{float:'right'}}>Guardar</button>
                            <br/><br/>
                        </h3>
                    
                    
                </div>
                
                
                </div>
                
                <this.state.bannBot/>
            </div>
        );
    }
}


export default EvaluadorEventos;

