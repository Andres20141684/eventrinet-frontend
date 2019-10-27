import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import frmEventNew from '../Components/Forms/frmEventNew'

class NewEventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        formProceso: frmEventNew,
        id_recived: 0
    }
    componentWillMount(){
        
        let retrievedObject = sessionStorage.getItem('nextProp');
        let retrievedJson = JSON.parse(retrievedObject); 
        console.log("pinchi Armando aki ta tu id XDDD:");
        console.log(retrievedJson);
        this.state.id_recived = retrievedJson.id_evento_nextProps;
    }
    render(){
        console.log(this.props.id_evento)
        return(
        <div> 
            <this.state.bannTop />
            <div style={{marginBottom:25}} >
                <this.state.formProceso id_recived={this.state.id_recived}/>
            </div>
            <this.state.bannBot/>
        </div>)
    }
}
export default NewEventPage;