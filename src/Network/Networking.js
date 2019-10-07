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

export async function Login(idOrganizador) {
    console.log('INTENTO DE POST!!');
    try {
        console.log('RECIBI UN idOrganizador: ' + idOrganizador);
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_activos', {
            method: 'POST',
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
        await AsyncStorage.setItem('SessionID', responseJson.SessionID || 'null');
        await AsyncStorage.getItem('SessionID').then((value) => {
            console.log(value);
        })
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO');
    }
}