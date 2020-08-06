// Join the existing session.
function joinSession(hotstarpartySessionId) {
    console.log("#InsideJoinSession")
    let socket = io.connect('http://localhost:3002');
    socket.on('connect', function () {
        console.log('Client connected, sending request', socket.id, new Date().toISOString());
        socket.emit('hotstar-request', { id: '123' });
        socket.on('hotstar-response', function (response) {
            console.log(new Date().toISOString(), 'Response received', response);
        });
    });
}


function __main__(params) {
    let hotstarpartySessionId = params["hotstarpartySessionId"]
    console.log("#Inside Main", hotstarpartySessionId)
    joinSession(hotstarpartySessionId)
}
