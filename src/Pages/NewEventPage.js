import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import frmEventNew from '../Components/Forms/frmEventNew'

class NewEventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        formProceso: frmEventNew,
        data_recived: {
            idOrganizador: 0,
            idEvento: 0
        }
    }
    componentWillMount(){

        let retrievednextProp = sessionStorage.getItem('nextProp');
        let retrieveddataUser = sessionStorage.getItem('dataUser');
        let retrievedJsonnextProp = JSON.parse(retrievednextProp);  
        let retrievedJsondataUser = JSON.parse(retrieveddataUser); 
        this.state.data_recived = retrievedJsonnextProp;
        console.log("pinchi Armando aki ta tu id XDDD:");
        console.log(this.state.data_recived);
        console.log(retrievedJsonnextProp);
        //sessionStorage.setItem("nextProp",null)
    }
    
    render(){
        
        return(
        <div> 
            <this.state.bannTop />
            <div style={{marginBottom:25}} >
                <this.state.formProceso 
                data_recived={this.state.data_recived}/>
            </div>
            <this.state.bannBot/>
        </div>)
    }
}
export default NewEventPage;