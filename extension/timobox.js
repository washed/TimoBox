console.log("TimoBox Extension loaded!");

let playlistBaseUrl = "https://open.spotify.com/playlist/";

function ControlLoop() {
	$.getJSON('http://localhost:8000/extensioncommand', function (data) {
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

function setPlayerCommand(playerCommand) {
	$.ajax({
		contentType: 'application/json',
		data:
			JSON.stringify(
				{
					command: playerCommand
				}
			),
		dataType: 'json',
		success: function (data) {
			console.log(data);
		},
		error: function () {
			console.log("PlayerCommand failed");
		},
		processData: false,
		type: 'POST',
		url: "http://localhost:8000/command"
	});
}

function navigateToUrl(url) {
	chrome.tabs.update({ active: true, url });
}