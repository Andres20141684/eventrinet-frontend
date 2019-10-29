import {AsyncStorage} from 'react';
const restURL = 'http://174.129.92.182:5000/api/';

export async function validar_sesion(var_user,var_password) {
    console.log('INTENTO DE LOGIN!!');
    try {
        console.log('RECIBI UN LOGIN con username: ' + var_user + var_password);
        let response = await fetch(restURL 
            + 'validar_session_ps', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: var_user,
                password: var_password
  
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);  
        console.log(response);
        console.log('Saving!!');
  
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
        return
    }
  }

export async function saludar(){
    try {
        let response = await fetch(restURL+'hola' ,{
            method:'GET'
        });
        let responseJson = response.json();
        console.log(responseJson);
        return responseJson;

    } catch (error){
        console.log(error);
        return error
    }
}

export async function insertNewEvent(data){

    try {
        let response = await fetch(restURL+'eventos/registrar_evento' ,{
            method:'POST',
            mode:'cors',
            headers: {Accept:"application/json","Content-Type":"application/json"},
            body: data
        });
        let responseJson = response.json();
        console.log(responseJson);
        return responseJson;

    } catch (error){
        console.log(error);
        return error
    }}


export async function ShowEvent(data){

    try {
        let response = await fetch(restURL+'eventos/mostrar_evento' ,{
            method:'POST',
            mode:'cors',
            headers: {Accept:"application/json","Content-Type":"application/json"},
            body: data
        });
        let responseJson = response.json();
        console.log(responseJson);
        return responseJson;

    } catch (error){
        console.log(error);
        return error
    }}
    
export async function populateDataOrgTab1(idOrganizador) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'eventos/listar_eventos_activos');
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_activos', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');
/*
        console.log('1er await!!');
        await AsyncStorage.setItem('SessionID', responseJson.SessionID || 'null');
        console.log('2do await!!');
        await AsyncStorage.getItem('SessionID').then((value) => {
            console.log(value);
        })
*/
        //console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function NetworkMutation_JAchievingData(props) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + props.methodPath);
    try {
        console.log('RECIBI UN props: ' , props);
        let response = await fetch(restURL + props.methodPath,
            {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                props.JsonToBack
            ),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');

        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

export async function populateDataOrgTab2(idOrganizador) {
    
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_historial', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

export async function populateDataEvaTab(idOrganizador) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'eventos/listar_eventos_preferencias');
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_preferencias', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

export async function populateDataPresiTab_asignar_evaluadores(idOrganizador) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'eventos/presidente');
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'presidente/eventos/asignar_evaluadores', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function populateDataPresiTab_en_fase_evaluacion(idOrganizador) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'presidente/eventos/en_fase_evaluacion');
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'presidente/eventos/en_fase_evaluacion', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador
            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
        console.log(responseJson);
        console.log('Saving!!');
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
