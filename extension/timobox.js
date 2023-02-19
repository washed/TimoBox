console.log("TimoBox Extension loaded!");

let playlistBaseUrl = "https://open.spotify.com/playlist/";

function ControlLoop() {
	fetch('http://localhost:8000/extensioncommand')
    .then(response => response.json())
    .then(json => {
        console.log(json);
		let data = json;
		switch (data.command) {
			case 'loadPlaylist':
				navigateToUrl(playlistBaseUrl + data.payload)
				setPlayerCommand("startPlaylist");
				break;
		}
    })
    .catch(function (error) {
      console.error(error)
    })
}
setInterval(ControlLoop, 5000);

function setPlayerCommand(playerCommand) {
	fetch("http://localhost:8000/command",
	{
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify(
			{
				command: playerCommand
			})
	})
	.then(function(res){ console.log(res) })
	.catch(function(res){ console.log(res) })
}

function navigateToUrl(url) {
	chrome.tabs.update({ active: true, url });
}