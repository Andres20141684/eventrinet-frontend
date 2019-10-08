import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EventPageTable from '../Components/Jtable/EventPageTable';
import { thisExpression } from '@babel/types';
import frmEventNew from '../Components/Forms/frmEventNew';
import StepThree_copy from '../Components/Forms/CreateEvent/StepThree';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form';

class Prueba extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,       
      }
    
    render(){
        return(            
        <div> 
            <this.state.bannTop />
            <div class="panel panel-primary mypanel" >
              <div class="panel-heading">
                  <h2 class="panel-title">Lista de Eventos activos</h2>                  
                  <a  class="pull-right" href="/organizerNewEvent" value="Nuevo">Nuevo</a>
               </div>
            <div  class="table-responsive">
            <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
            </div>
            </div>
            <this.state.bannBot/> 
        </div>)
    }
}
export default Prueba;
