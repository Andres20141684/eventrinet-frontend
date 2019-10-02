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


class PresiEventos_asignarEva extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
    }
   
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos ={ //state is by default an object
            chupetinesGA: [
               { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com',opt: ''},
               { id: 2, name: 'Ali', age: 19, email: 'ali@email.com'    ,opt: ''},
               { id: 3, name: 'Saad', age: 16, email: 'saad@email.com'  ,opt: ''},
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''},
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''},
               { id: 4, name: 'Asad', age: 25, email: 'asad@email.com'  ,opt: ''}
            ]
         }
        return(
            <div> 
                <this.state.bannTop />
                /*AQUI DEBO RECIBIR EL NOMBRE DEL EVENTO AL CUAL ASIGNAR EVALUADORES*/
                <h1>CONFERENCIA ANUAL POR JINSSJ EN NAMEKUSEI - 28 de Diciembre<br/><br/></h1>
                <div class="container">
                <div class="panel panel-default">

                    <h1>Asigna los evaluadores a las propuestas<br/><br/></h1>
                    <h4>La modalidad de preferencia fue (por categoria)<button style={{float:'right'}}>Ver mas...</button></h4>
                    <h4>Asignacion automatica<button style={{float:'right'}}>Aplicar</button></h4>
                    <h4><br/></h4>
                    < AsignarEvaluadorTable data ={datos}/>;
                    
                    
                </div>
                
                <h2><br/></h2>
                    <h3>
                    <button style={{float:'left'}}>Atras</button>
                    <button style={{float:'right'}}>Guardar</button>
                <br/><br/>
                </h3>
                </div>
                
                <this.state.bannBot/>
            </div>
        );
    }
}


export default PresiEventos_asignarEva;

