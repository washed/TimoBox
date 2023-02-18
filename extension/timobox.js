console.log("TimoBox Extension loaded!");

let playlistBaseUrl = "https://open.spotify.com/playlist/";

function ControlLoop() {
	$.getJSON('http://localhost:8000/extensioncommand', function(data) {
		console.log(data);
		switch (data.command) {			
			case 'loadPlaylist':
				navigateToUrl(playlistBaseUrl + data.payload)
				setPlayerCommand("startPlaylist");
				break;
		}
	});
}
setInterval(ControlLoop, 5000);

function setPlayerCommand(command) {
	$.post( 
		"http://localhost:8000/command", 
		{
			command: "startPlaylist"
		}
	);
}

function navigateToUrl(url) {
	chrome.tabs.update({ active: true, url });
}