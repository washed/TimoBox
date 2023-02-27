console.log("TimoBox Extension loaded!");

let playlistBaseUrl = "https://open.spotify.com/playlist/";
let playerReady = false;
const playerCommands = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('Received player message', message);
	
	switch(message) {
		case 'ping':
			break;
		case 'ready':
			playerReady = true;
			break;
	}

	sendResponse('ack');
  });

function ControlLoop() {
	fetch('http://localhost:8000/commandextension')
		.then(response => response.json())
		.then(json => {
			let data = json;

			if (data.command !== "") {
				console.log(json);
			}

			switch (data.command) {
				case 'loadPlaylist':
					playerReady = false;
					navigateToUrl(playlistBaseUrl + data.payload);					
							//setPlayerCommand("startPlaylist")
					playerCommands.push({
						command: 'startPlaylist'
					});
					break;
			}
		})
		.catch(function (error) {
			console.error(error)
		})
}
setInterval(ControlLoop, 500);

function sendNextPlayerCommand() {
	if (!playerReady) {
		return;
	}

	let nextCommand = playerCommands.pop();
	if (nextCommand) {
		console.log('Send next command ', nextCommand);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(
				tabs[0].id,
				JSON.stringify(nextCommand),
				(response) => {
					console.log('Send next command Response', response);
				}
			);
		});
		
	}
}
setInterval(sendNextPlayerCommand, 500);

function setPlayerCommand(playerCommand) {
	console.log("setPlayerCommand: ", playerCommand);
	fetch("http://localhost:8000/commandplayer",
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(
				{
					command: playerCommand,
					payload: ""
				})
		})
		.then(function (res) { console.log(res) })
		.catch(function (res) { console.log(res) })
}

function navigateToUrl(url) {
	chrome.tabs.update(
		{
			active: true,
			url
		}
	);
}