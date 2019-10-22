import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom';
import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';
import Dashboard from '../Components/Dashboard';
import { thisExpression } from '@babel/types';

import {Link}  from "react-router-dom";

class EventInscriptionPage extends Component{
    constructor(props) {
    
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        /*
        console.log("HAAAAAAAAAAAAAAAAAAAAA")
        Networking.populateDataEvaTab(1,2).then((value) => {
              this.setState({datos_tabla: value});   
              
        });*/
     }
     state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        datosEventos: 
        [{  nombre: 'Datos1',  fechaLimitePref: '21/03/2019', preferencia: 'Por Categoria' }]
     }

    render(){
        return(
        <div> 
      <Link to="/EventInscriptionPage">EventInscriptionPage</Link> | 
      <Link to="/">Home</Link>
            <this.state.bannTop />
            <h1>
            <font size="38">
                Inscripción a Eventos como asistente
                </font></h1>
            <Dashboard/>
            <BannerBottom/>
        </div>
        )
    }
}
export default EventInscriptionPage;