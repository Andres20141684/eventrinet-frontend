import {AsyncStorage} from 'react';

const restURL = 'http://localhost:5000/api/';

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
export async function saludar2(idOrganizador){
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'eventos/listar_eventos_activos');
    try {
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_activos',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idOrganizador,
                InstallationID: 'UAE', //Should Change This
            }),
        });
        let responseJson = await response.json();
        console.log('Saving!!!');
        await AsyncStorage.setItem('SessionID', responseJson.SessionID || 'null');
        await AsyncStorage.getItem('SessionID').then((value) => {
            console.log(value);
        })
        console.log(responseJson);
        return responseJson;    
    }catch (error){
        console.error('CATCH ALCANZADO :(');
        console.log(error);
    }
}


export async function Login(idOrganizador) {
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