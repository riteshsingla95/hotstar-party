const SESSION_ID_KEY = "hotstarpartySessionId"
var script = "console.log('here')"

let partyInitButton = document.getElementById('partyInitButton');
let partyInitMsg = document.getElementById('partyInitMsg');

var currentState = 'NOT_INITIALIZED';

chrome.storage.sync.get('state', function (data) {
    currentState = data.state;
    if (currentState == 'ALREADY_INITIALIZED') {
        updateScreenWithMsg("Party already initialized.")
    }
});

function createSession(tab) {
    var date = new Date();
    var milliseconds = date.getTime();
    var sessionId = milliseconds.toString(36) + Math.random().toString(36).substr(2, 9)
    var url = new URL(tab.url)
    url.searchParams.set(SESSION_ID_KEY, sessionId)
    chrome.tabs.update(tab.id, { url: url.toString() });
}

function joinSession(hotstarpartySessionId) {
    console.log("#InsideJoinSession")
    let socket = io.connect('http://localhost:3002');
    socket.on('connect', function () {
        console.log('Client connected');
        alert('Client connected');
        socket.emit('hotstar', "sadasd");
    });
}

partyInitButton.onclick = function (element) {
    // hide the button.
    updateScreenWithMsg("Party initiated successfully.")
    // let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        var url = new URL(tabs[0].url);
        var hotstarpartySessionId = url.searchParams.get("hotstarpartySessionId");
        if (hotstarpartySessionId != undefined) {
            // alert(hotstarpartySessionId)
            // joinSession(hotstarpartySessionId);
        } else {
            createSession(tabs[0]);
        }

        var params = {}
        params["hotstarpartySessionId"] = hotstarpartySessionId
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: '__main__(' + JSON.stringify(params) + ')' });
        // { code: "joinSession(" + hotstarpartySessionId+ "); var watcher = new DurationChangeWatcher(); watcher.init();" });
    });
};

function updateScreenWithMsg(msg) {
    partyInitButton.style.display = "none";
    partyInitMsg.innerHTML = msg
    // chrome.storage.sync.set({ state: 'ALREADY_INITIALIZED' }, function () {
    //     console.log("Upadting the state.");
    // });
}