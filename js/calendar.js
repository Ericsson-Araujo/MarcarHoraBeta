// Client ID and API key from the Developer Console
var CLIENT_ID = '604866099778-4d8cpriuonsnfb20hg21f3fgkmp6tdhk.apps.googleusercontent.com'; //ERICSSON
//var CLIENT_ID = '30ehoks2l8up4civ1oblnp1sug@group.calendar.google.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var mainContainer = document.getElementById('mainContainer');
var mensagemLogoff = document.getElementById('mensagem1');
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
    
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });

}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    /*
    authorizeButton.style.display = 'none';
    mensagemLogoff.style.display = 'none';
    signoutButton.style.display = 'block';
    mainContainer.style.display = 'block';
    */
    authorizeButton.classList.add('hide');
    mensagemLogoff.classList.add('hide');
    signoutButton.classList.remove('hide');
    mainContainer.classList.remove('hide');
    
    listUpcomingEvents();
    
  } else {
    /*
    authorizeButton.style.display = 'block';
    mensagemLogoff.style.display = 'block';
    signoutButton.style.display = 'none';
    mainContainer.style.display = 'none';
    */
    authorizeButton.classList.remove('hide');
    mensagemLogoff.classList.remove('hide');
    signoutButton.classList.add('hide');
    mainContainer.classList.add('hide');
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  if(textContent != null){
    pre.appendChild(textContent);
  }

}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': '30ehoks2l8up4civ1oblnp1sug@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    // 'maxResults': 30,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
