const socket = io();

function joinChat() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('username').style.display = 'none';
        document.querySelector('button[onclick="joinChat()"]').style.display = 'none';
        
        document.getElementById('chatbox').style.display = 'block';
    }
}


function sendMessage() {
    const message = document.getElementById('message').value;
    if (message) {
        const username = document.getElementById('username').value;
        socket.emit('chat message', { username, message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
        document.getElementById('message').value = '';
    }
}

socket.on('chat message', (msg) => {
    const messagesDiv = document.getElementById('messages');
    const messageElem = document.createElement('div');
    messageElem.innerText = `${msg.timestamp} - ${msg.username}: ${msg.message}`;
    messagesDiv.appendChild(messageElem);
});
