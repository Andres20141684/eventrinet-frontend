const restURL = 'http://52.70.128.233:5000/api/';
//const restURL = 'http://localhost:5000/api/';
async function crear_cuenta(
    var_email,
	var_last_name,
	var_name
	) {
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
                given_name: var_name
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


async function onSignUp(googleUser){
	var profile = googleUser.getBasicProfile();
	console.log("Intento de Crear usuario con cuenta Gmail")
	console.log('Display the profile:');
	console.log(profile);
	console.log("ID",profile.getId());
		console.log("NAME:",profile.getName());
		console.log(profile.Paa);
		console.log(profile.U3);
		console.log(profile.ofa);
		console.log(profile.wea);

		let retrievedObject = sessionStorage.getItem('tipoSingUp');
		//if(retrievedObject.tipo)
		console.log("---------------------------------------");
		console.log(retrievedObject);
		if(retrievedObject=='gmail'){
			console.log("---------------------------------------");
			crear_cuenta(profile.U3, profile.ofa, profile.wea).then(
				(response) => {
					console.log("Data del usuario",response);
					if (response.succeed){
					  	console.log("estamos accediendoo bbecita prrr");
					  	console.log(response);					  		
					  	console.log("usuario registrado")
						sessionStorage.setItem('tipoSingUp','_');
						sessionStorage.setItem('tipoLogin',"gmail")
						sessionStorage.setItem('dataUser', JSON.stringify(response));
						window.location.replace("./");						
					}else{
					  console.log("YIYI no se pudo crear cuenta");              
					  alert(response.message)

					  //CERRAR SESION DEL USUARIO GMAIL

					  try{
						const auth2 = window.gapi.auth2.getAuthInstance()
						console.log("auth2 ", auth2)
						if (auth2 != null) {
						  auth2.signOut().then(
							auth2.disconnect().then(this.props.onLogoutSuccess)
						  )
						}
					  }catch(err){
						console.log(err)
					  }


					  /*
					  validar_sesion(profile.U3, profile.ofa, profile.wea).then(
						(responsed) => {
							console.log(responsed);
							let connectedUser = responsed;
							console.log("Data del usuario",connectedUser);
							if (connectedUser.succeed){
								console.log("estamos creando bbecita prrr");
								console.log(connectedUser);
								sessionStorage.setItem('dataUser', 
								JSON.stringify(connectedUser));
							}
							sessionStorage.setItem('tipoLogin',"gmail")
							window.location.replace("./");
					  });*/
					}
				}
			)
			return;
		}
}

async function validar_sesion(var_email,var_given_name,var_family_name) {
    try {
        let response = await fetch(restURL + 'validar_session', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
				{
					email: var_email,
					family_name: var_family_name,
					given_name: var_given_name
				}
			),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
		console.log(responseJson);
		console.log(responseJson.succeed);		
		console.log('Saving!!');
		
		if (responseJson.succeed){
			let connectedUser = responseJson;
			console.log("Data del usuario",connectedUser);
			sessionStorage.setItem('dataUser', JSON.stringify(connectedUser))
			sessionStorage.setItem('tipoLogin',"gmail")

			console.log("El correo esta registrado en Eventrinet!")
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
			console.log('User signed out.');
			});

			window.location.replace("./");
			
		}else{
			console.log("El correo no esta registrado en Eventrinet!")
		}

        return responseJson;
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

var request=null;

// Sign-in success callback
function onSignIn1(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	console.log("LOGIN -> ING")

      
}

function onSignIn(googleUser) {
	// Get the Google profile data (basic)
	var profile = googleUser.getBasicProfile();

	console.log("Intento de LOGIN con cuenta Gmail")
	console.log('Display the profile:');
	console.log(profile);
	console.log("ID",profile.getId());
		console.log("NAME:",profile.getName());
		console.log(profile.Paa);
		console.log(profile.U3);
		console.log(profile.ofa);
		console.log(profile.wea);

		validar_sesion(profile.U3, profile.ofa, profile.wea).then(
			(response) => {
				console.log(response);
				let connectedUser = response;
				console.log("Data del usuario",connectedUser);
				if (connectedUser.succeed){
					console.log("estamos creando bbecita prrr");
					console.log(connectedUser);
					sessionStorage.setItem('dataUser', 
					JSON.stringify(connectedUser));
					

					console.log("usuario registrado")
					sessionStorage.setItem('tipoSingUp','_');
					window.location.replace("./");
				}else{
					console.log("YIYI no se pudo crear cuenta");
					alert(connectedUser.message);
					//window.location.replace("./");
				}	
			}
		)

/*
		let retrievedObject = sessionStorage.getItem('tipoSingUp');
		//if(retrievedObject.tipo)
		console.log("---------------------------------------");		
		if(retrievedObject=='gmail'){
			console.log("---------------------------------------");
			validar_sesion(profile.U3, profile.ofa, profile.wea).then(
				(response) => {
					console.log(response);
					let connectedUser = response;
					console.log("Data del usuario",connectedUser);
					if (connectedUser.succeed){
						console.log("estamos creando bbecita prrr");
						console.log(connectedUser);
						sessionStorage.setItem('dataUser', 
						JSON.stringify(connectedUser));
						

						console.log("usuario registrado")
						sessionStorage.setItem('tipoSingUp','_');
						window.location.replace("./");
					}else{
						console.log("YIYI no se pudo crear cuenta");
						alert(connectedUser.message);
						//window.location.replace("./");
					}	
				}
			)
			return;
		}*/
}
var respuestaVal = null;
var superprofile=null;
function getJsonGoogleUser(){
	/**porque quiero y porque puedo */
	
	request.execute(
		function (resp) {
			superprofile=resp
		
		console.log("LOGIN -> ING")
		console.log('ID: ' + superprofile.id); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + superprofile.given_name);
		console.log('Image URL: ' + superprofile.family_name);
		console.log('Email: ' + superprofile.email); // This is null if the 'email' scope is not present.
		
		
		if (retrievedJson != null ){//no es regitarr
		console.log("---------------------------------------");
		console.log(retrievedJson);
		
		
			validar_sesion(
				resp.email,
				resp.given_name,
				resp.family_name
				).then((value) => {
					respuestaVal= value
			  });
		 	return;
		   }
	
	
	});

	
}
// Sign-in failure callback
function onFailure(error) {
	console.log(error);
}

// Sign out the user
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		document.getElementsByClassName("userContent")[0].innerHTML = '';
		document.getElementsByClassName("userContent")[0].style.display = "none";
		document.getElementById("gSignIn").style.display = "block";
	});
	
	auth2.disconnect();
}


function toJSON(p) {
	if (typeof (p.data) === 'object') {
		// Convert the POST into a javascript object
		try {
			p.data = JSON.stringify(p.data);
			p.headers['content-type'] = 'application/json';
		}
		catch (e) {}
	}
}

