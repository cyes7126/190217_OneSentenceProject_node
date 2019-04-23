const admin = require('firebase-admin');
/*const serviceAccount = require('./node_modules/serviceAccountKey/onesentence-cf232-firebase-adminsdk-eyozf-f970728778.json');*/

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

function getAccessToken(){
    return new Promise(function(resolve,reject){
        var key = require('./node_modules/serviceAccountKey/onesentence-cf232-firebase-adminsdk-eyozf-f970728778.json');
        var jwtClient = new google.auth.JWT(
            yoo712695@gmail.com,
            null,
            
        )
    })
}