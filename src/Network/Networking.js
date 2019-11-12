import {AsyncStorage} from 'react';

//const restURL = 'http://34.235.112.27:5000/api/';
const restURL = 'http://localhost:5000/api/';

export async function getInfoUsuario_byId(_idUsuario) {
    console.log('buscando por ID Usuario...');
    try {        
        let response = await fetch(restURL 
            + 'usuario/datosPersonales', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: _idUsuario
  
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

export async function crear_cuenta(var_email,var_last_name,var_name, var_username, var_password) {
    console.log('Creando Usuario...');
    try {        
        let response = await fetch(restURL 
            + 'crear_cuenta', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: var_email,
                family_name: var_last_name,
                given_name: var_name,
                username: var_username,
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

export async function validar_sesion(var_user,var_password) {
    console.log('INTENTO DE LOGIN!!');
    try {
        console.log('RECIBI UN LOGIN con username: ' + var_user + var_password);
        let response = await fetch(restURL 
            + 'validar_session', {
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


  export async function cambiar_contrasena(var_email) {
    console.log('Servicio envio correo electronico con contraseña');
    try {        
        let response = await fetch(restURL 
            + 'cambiar_contrasena', {
            method: 'POST',
            mode: 'cors',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json',},
            body: JSON.stringify({
                datoUsuario: var_email
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
    

export async function getEventosPublicados() {
    try {
        console.log('INTENTO DE GET!! en ' +restURL 
        + 'eventos/listar_eventos_publicados');
        let response = await fetch(restURL+'eventos/listar_eventos_publicados' ,{
            method:'GET'
        });
        let responseJson = response.json();
        console.log(responseJson);
        return responseJson;

    } catch (error){
        console.log(error);
        return {}
    }
      
} 


export async function listarOrganizadores() {
    try {
        console.log('INTENTO DE GET!! en ' +restURL 
        + 'listar_organizadores_activos');
        let response = await fetch(restURL+'listar_organizadores_activos' ,{
            method:'GET'
        });
        let responseJson = response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error){
        console.log(error);
        return {}
    }
      
} 
export async function getEventosConvocatoria() {
    console.log('INTENTO DE POST!! en ' +restURL 
    + 'eventos/listar_eventos_convocatoria');
    try {
        console.log('fetching getEventosConvocatoria() ');
        let response = await fetch(restURL 
            + 'eventos/listar_eventos_convocatoria', {
            method: 'GET'
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

export async function populateDataEvaTab(idPresidente) {
    try {
        console.log('RECIBI UN idPresidente: ' + idPresidente);
        let response = await fetch(restURL 
            + 'presidente/eventos/asignar_evaluadores', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idPresidente
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
export async function populateDataEvalElegirPref(idEvaluador) {
    try {
        console.log('RECIBI UN idEvaluador: ' + idEvaluador);
        let response = await fetch(restURL 
            + 'evaluador/eventos/listar_eventos_preferencias', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idEvaluador
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
export async function populateDataEvalEvaluar(idEvaluador) {
    try {
        console.log('RECIBI UN idEvaluador: ' + idEvaluador);
        let response = await fetch(restURL 
            + 'evaluador/eventos/listar_eventos_evaluar', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idEvaluador
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

export async function populateDataPresiEvalFinal(idPresidente) {
    try {
        console.log('RECIBI UN idPresidente: ' + idPresidente);
        let response = await fetch(restURL 
            + 'presidente/eventos/en_fase_evaluacion', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idPresidente
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

export async function NetworkMutation_JAchievingData(props) {
    console.log('INTENTO DE POST!! en ' +restURL 
    + props.methodPath);
    console.log('RECIBI UN props: ' , props);
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
        return null;
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
export async function listar_categoriasPorEvento(_idEvento) {
    
    try {
        console.log('RECIBI UN param: ' + _idEvento);
        let response = await fetch(restURL 
            + 'categorias/listarCategoriasXEvento', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEvento: _idEvento
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}/*
export async function registrar_PrefXCat(idEvento, idUsuario, idCategoria) {
    
    try {
        console.log('RECIBI UN param: ' + idEvento);
        let response = await fetch(restURL 
            + 'evaluador/registrar_preferencias_categoria', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEvento: idEvento,
                idUsuario : idUsuario,
                idCategoria : idCategoria
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}*/
export async function ListarPrefXCateg(idEvento, idUsuario) {
    
    try {
        console.log('RECIBI UN param: ' + idEvento);
        let response = await fetch(restURL 
            + 'preferencias/listarPreferenciasXCategoria', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEvento: idEvento,
                idEvaluador : idUsuario
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

export async function registrar_PrefXCat(data){

    try {
        let response = await fetch(restURL+'evaluador/registrar_preferencias_categoria' ,{
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
    }
}

export async function listarPropuestasXFase(idEvento, idUsuario) {
    try {
        console.log('RECIBI UN param: ' + idEvento);
        let response = await fetch(restURL 
            + 'evaluador/listarPropuestasXFase', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEvento: idEvento,
                idUsuario : idUsuario
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function listarCriteriosXFase(_idFase) {
    
    try {
        let response = await fetch(restURL 
            + 'criterios/ListarCriteriosXFase', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idFase: _idFase
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function faseActual(idEvento) {
    
    try {
        let response = await fetch(restURL 
            + 'evaluador/faseActual', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idEvento: idEvento
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function listarCamposRptaXFase(idPropuesta, idFase) {
    try {
        let response = await fetch(restURL 
            + 'camposPEnun/listarCamposRptaXFase', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPropuesta: idPropuesta,
                idFase : idFase
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}
export async function registrarCalificacionXPropuesta(data){
    try {
        let response = await fetch(restURL+'evaluador/registrarCalificacionXPropuesta' ,{
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
    }
}
export async function mostrarCalificacionXPropuesta(idUsuario, idFase, idPropuesta) {
    try {
        let response = await fetch(restURL 
            + 'evaluador/mostrarCalificacionXPropuesta', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario : idUsuario,
                idFase : idFase,
                idPropuesta: idPropuesta
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}