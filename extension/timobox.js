console.log("TimoBox Extension loaded!");

let spotifyBaseUrl = "https://open.spotify.com/";
let playlistBaseUrl = spotifyBaseUrl + "playlist/";
let playerReady = false;
const playerCommands = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('Received player message', message);

	switch (message) {
		case 'ping':
			break;
		case 'ready':
			playerReady = true;
			break;
	}

	sendResponse('ack');
});

function ControlLoop() {
	fetch('http://localhost:8000/command')
		.then(response => response.json())
		.then(json => {
			let data = json;

			if (data.command !== "") {
				console.log(json);
			}

			switch (data.command) {
				case 'LOAD_PLAYLIST':
					playerReady = false;
					navigateToUrl(playlistBaseUrl + data.payload);
					playerCommands.push({
						command: 'START_PLAYLIST'
					});
					break;
				case 'MEDIA_PLAY_PAUSE':
					playerCommands.push({
						command: 'MEDIA_PLAY_PAUSE'
					});
					break;
				case 'MEDIA_PREV':
					playerCommands.push({
						command: 'MEDIA_PREV'
					});
					break;
				case 'MEDIA_NEXT':
					playerCommands.push({
						command: 'MEDIA_NEXT'
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
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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

function navigateToUrl(url) {
	chrome.tabs.update(
		{
			active: true,
			url
		}
	);
}

setTimeout(() => {
	chrome.tabs.query({ active: true }, tabs => {
		console.log(tabs);
		let url = tabs[0].url;
		if (!url.includes('open.spotify')) {
			navigateToUrl(spotifyBaseUrl);
		}
	});
}, 2000);