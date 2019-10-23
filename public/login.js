const restURL = 'http://localhost:5000/api/';

var connectedUser = null;

async function validar_sesion_ps(var_user,var_password) {
    console.log('INTENTO DE LOGIN!!');
    try {
        console.log('RECIBI UN LOGIN: ' + var_user + var_password);
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
		console.log(responseJson[0]);
		console.log(response);
		console.log(response[0]);
        console.log('Saving!!');

        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

async function validar_sesion(var_email,var_given_name,var_family_name) {
    console.log('INTENTO DE LOGIN!!');
    try {
        console.log('RECIBI UN LOGIN: ' + var_email + var_given_name+ var_family_name);
        let response = await fetch(restURL 
            + 'validar_session', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: var_email,
                family_name: var_family_name,
                given_name: var_given_name

            }),
        });
        console.error('CATCH NO ALCANZADO, antes del await');
        let responseJson = await response.json();
        console.log('Saving!!');
		console.log(responseJson);
		console.log(responseJson[0]);
		console.log(response);
		console.log(response[0]);
        console.log('Saving!!');

        return responseJson;  
    } catch (error) {
        console.error(error);
        console.error('CATCH ALCANZADO :(');
    }
}

var request=null;
function renderButton() {
	gapi.signi2.render(
		'gSignIn',
		{
		'scope': 'profile email',
		'width': 240,
		'height': 50,
		'longtitle': true,
		'theme': ' dark',
		'onsuccess': onSuccess,
		'onfailure': onFailure
		}
	);
}
var superprofile = {
	email: "_",
	family_name: "_",
	given_name: "_",
	id: "_",
	locale: "_",
	name: "_",
	picture: "_"
}
// Sign-in success callback
function onSignIn1(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	console.log("LOGIN -> ING")

      
}
var oauth2 = google.oauth2({
	auth: auth,
	version: 'v2'
});

oauth2.userinfo.v2.me.get(
function(err, res) {
if (err) {
	console.log(err);
} else {
	console.log(res);
}
});
function onSignIn(googleUser) {
	// Get the Google profile data (basic)
	var profile = googleUser.getBasicProfile();
	/*Networking.validar_sesion(
		
		profile.U3,
		profile.ofa,
		profile.wea
		).then((value) => {
		this.setState({datos_tabla1: value});   
		
  	});*/
	console.log('Display the profile:')
	console.log(profile)
	console.log(profile.ig)
		console.log(profile.Eea)
		console.log(profile.Paa)
		console.log(profile.U3)
		console.log(profile.ofa)
		console.log(profile.wea)
	// Retrieve the Google account data
	gapi.client.load('oauth2', 'v2', function () {
		request = gapi.client.oauth2.userinfo.get({
			'userId': 'me'
	});
		
		
		console.log('Display the request:')
		console.log(request)
		getJsonGoogleUser();
		
	});

	
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
		validar_sesion(
		
			resp.email,
			resp.given_name,
			resp.family_name
			).then((value) => {
				respuestaVal= value 
			
		  });
	
	
	});

	
}
// Sign-in failure callback
function onFailure(error) {
	alert(error);
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
