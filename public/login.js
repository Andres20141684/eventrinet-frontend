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
function onSignIn2(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

}
function onSignIn(googleUser) {
	// Get the Google profile data (basic)
	var profile = googleUser.getBasicProfile();
	//var superprofile;
	console.log('Display the superprofile:')
			console.log(superprofile)
	// Retrieve the Google account data
	gapi.client.load('oauth2', 'v2', function () {
		var request = gapi.client.oauth2.userinfo.get({
			'userId': 'me'
		});
		
		request.execute(function (resp) {
			superprofile=JSON.stringify({resp})
			// Display the user details
			console.log('Display the resp:')
			console.log(resp)
			superprofile=resp
			/*
			superprofile.email=resp.email
			superprofile.family_name=resp.family_name
			superprofile.given_name=resp.given_name
			superprofile.id=resp.id
			superprofile.locale=resp.locale
			superprofile.name=resp.name
			superprofile.picture=resp.picture
			*/
			/*var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
			profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'
			+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'
			+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'
			+resp.locale+'</p><p><b>Google Profile:</b>
			 <a target="_blank" href="'+resp.link+'">click to view profile</a>
			 </p>';
			document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
			
			document.getElementById("gSignIn").style.display = "none";
			document.getElementsByClassName("userContent")[0].style.display = "block";*/
			console.log('Display the superprofile:')
			console.log(superprofile)
		});
	});
	console.log('Display the superprofile:')
			console.log(superprofile)
	
}
function getJsonGoogleUser(){
	/**porque quiero y porque puedo */
	var profileHTML = '<h3>Welcome '+resp.given_name+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></h3>';
			profileHTML += '<img src="'+resp.picture+'"/><p><b>Google ID: </b>'+resp.id+'</p><p><b>Name: </b>'+resp.name+'</p><p><b>Email: </b>'+resp.email+'</p><p><b>Gender: </b>'+resp.gender+'</p><p><b>Locale: </b>'+resp.locale+'</p><p><b>Google Profile:</b> <a target="_blank" href="'+resp.link+'">click to view profile</a></p>';
			document.getElementsByClassName("userContent")[0].innerHTML = profileHTML;
			
			document.getElementById("gSignIn").style.display = "none";
			document.getElementsByClassName("userContent")[0].style.display = "block";
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
