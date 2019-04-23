var config = {
    apiKey: "AIzaSyCQxll--7QIxMwQyhjNzgLcbUF1oR3AiKE",
    authDomain: "onesentence-cf232.firebaseapp.com",
    databaseURL: "https://onesentence-cf232.firebaseio.com",
    projectId: "onesentence-cf232",
    storageBucket: "onesentence-cf232.appspot.com",
    messagingSenderId: "500084519426"
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.usePublicVapidKey("BF2hOgPU845xSpch1tb2gSR0-ZVUk-2ENmdnZIi7dvp93k0yzNqz4_Y29ZAuod2FelWZzsetcH3wg5S-4qO1CYo");

// IDs of divs that display Instance ID token UI or request permission UI.
/*  var tokenDivId = 'token_div';
  var permissionDivId = 'permission_div';*/

messaging.requestPermission()
    .then(function () {
        console.log('permission granted');
        return messaging.getToken();
    }).then(function (token) {
        if (token) {
            console.log('받아온 토큰값 :' + token);
            sendTokenToServer(token);
            updateUIForPushEnabled(token);
        } else {
            console.log('No token');
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    }).catch(function (err) {
        alert('Unable to get permission');
        console.log('Unable to get permission', err);
        setTokenSentToServer(false);
    });

messaging.onMessage(function (payload) {
    console.log('Message received~ ', payload);


    //appendMessage(payload);
});

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}


function updateUIForPushEnabled(currentToken) {
    showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
    console.log('updateUIForPushPermissionRequired');
}

function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showToken(currentToken) {
    // Show token in console and UI.
    /*console.log("showToken:" + currentToken);*/
    /*var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;*/
}



function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}

function push() {
    var postModel = {
        "data": {
            "title": "새로운 한문장 등록",
            "description": "지금 한문장을 확인하세요.",
            "icon":"/logo.png"
        },
        "to": "dVns64R_5i0:APA91bGL7w8bi3PGOOgu8m-J5icndrnhGDohTS4Cc3NXQLDYtr6RttxJIYZfJVacpd5qxW_UNUC2DPpheIG9oc3E6Ld-5PFLQD4wjA9VvxxNgcIs64-_9bqG7WB_TxBsmuvbp2JdCR1F"
    };

    var data = JSON.stringify(postModel);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
    xhr.setRequestHeader("Authorization", "key=AAAAdG9cMgI:APA91bHyKrXf6wy9aXMMhKdBQv-oqPSmWUWVNY8Ei65TaBznXv402dOnve_S-tP6n8fmiBiNxZz8ETYygxXt7z_G67x7QSfMpKLhrcVUniXihKcqaP_1hp3ELnXOnz2e2eqtCCIN371I");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

}




/*function resetUI() {
  clearMessages();
  showToken('loading...');
  // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
  // [END get_token]
}
function showToken(currentToken) {
  // Show token in console and UI.
  var tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
}
// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
  
  
function showHideDiv(divId, show) {
  const div = document.querySelector('#' + divId);
  if (show) {
    div.style = 'display: visible';
  } else {
    div.style = 'display: none';
  }
}
  
function deleteToken() {
  // Delete Instance ID token.
  // [START delete_token]
  messaging.getToken().then(function(currentToken) {
    messaging.deleteToken(currentToken).then(function() {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // [START_EXCLUDE]
      // Once token is deleted update UI.
      resetUI();
      // [END_EXCLUDE]
    }).catch(function(err) {
      console.log('Unable to delete token. ', err);
    });
    // [END delete_token]
  }).catch(function(err) {
    console.log('Error retrieving Instance ID token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
  });
}
// Add a message to the messages element.
function appendMessage(payload) {
  const messagesElement = document.querySelector('#messages');
  const dataHeaderELement = document.createElement('h5');
  const dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderELement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
}
// Clear the messages element of all children.
function clearMessages() {
  const messagesElement = document.querySelector('#messages');
  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
}*/
