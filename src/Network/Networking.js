import {AsyncStorage} from 'react';

const restURL = 'http://localhost:5000/api/';

export async function login (name, pass) {
    try {
        let response = await fetch(restURL + 'login', {
            method:'POST',
            body: JSON.stringify({"name":name, "pass":pass})
        });

        let responseJson = response.json(); // {status:true, data:{sesion:true, roles:["admin","publicador"] msj:"error de credenciales"}}
        console.log(responseJson);
        return responseJson;

    } catch (error) {
        console.log(error);
        return error
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
        let response = await fetch(restURL+'eventos/crear_evento' ,{
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
