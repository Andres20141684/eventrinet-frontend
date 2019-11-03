
import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EvaluadorEventosTable from '../Components/Jtable/EvaluadorEventosPrefTable';
import EvaluadorEventosEvaluarTable from '../Components/Jtable/EvaluadorEventosEvaluarTable';


import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import ReactTable from 'react-table';
import 'react-table/react-table.css'



class SelectedEvent extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected",
        idSelectedEvent: 1
    }
   
    render(){
        var datos1 ={   
            listaeventos: 'Datos1',
            Fecha_maxima: '21/03/2019',
            Tipo_Preferencia: 'Por Categoria' ,
            agregar_preferencia: ''
              
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
                        <h1><font size="40">Aqui va todo lo importante del evento</font><br/><br/></h1>
                
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


export default SelectedEvent;

