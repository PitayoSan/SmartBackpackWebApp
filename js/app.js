var database = firebase.database();
var humedad  = database.ref("humidity");
var nivelLuz = database.ref("lightLevel");
var sonarDis = database.ref("sonarDist");
var temp     = database.ref("temp");
var isMving  = database.ref("isMoving");

function logIn() {
  var email = document.getElementById("logInEmail");
  var password  = document.getElementById("logInPassword");
  firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage)
  });
}

function register() {
  var email = document.getElementById("SignInEmail");
  var password  = document.getElementById("SignInPassword");
  var passwordRe = document.getElementById("SignInRePassword");
  if(password.value!=passwordRe.value) {
    window.alert("Las contraseñas deben coincidir.");
  } else {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
  }
}

function logOut(){
  firebase.auth().signOut().then(function() {
    console.log("Sesion cerrada correctamente");
    loggedIn = false;
  }, function(error){
    console.error("Sign out error: ", error);
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  user = firebase.auth().currentUser;
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(uid);
    document.getElementById("loginSheet").style.display = "none";
    document.getElementById("logedSheet").style.display = "block";
    loggedIn = true;
    console.log(loggedIn)
  } else {
    console.log("not logged");
    document.getElementById("loginSheet").style.display = "block";
    document.getElementById("logedSheet").style.display = "none";
  }
});

var loggedIn
humedad.on('value', function(snapshot) {
  if(loggedIn){
    console.log(snapshot.val());
    document.getElementById('tHum').innerHTML = snapshot.val();
  }
})
nivelLuz.on('value', function(snapshot) {
  if(loggedIn){
    console.log(snapshot.val());
    document.getElementById('tLuz').innerHTML = snapshot.val();
  }
})
sonarDis.on('value', function(snapshot) {
  if(loggedIn){
    console.log(snapshot.val());
    document.getElementById('tDist').innerHTML = snapshot.val();
  }
})
temp.on('value', function(snapshot) {
  if(loggedIn){
    console.log(snapshot.val());
    document.getElementById('tTemp').innerHTML = snapshot.val();
  }
})
isMving.on('value', function(snapshot) {
  if(loggedIn){
    console.log(snapshot.val());
    document.getElementById('tMov').innerHTML = snapshot.val();
  }
})
