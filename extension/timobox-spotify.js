console.log("TimoBox Spotify started");

function ControlLoop() {
	$.getJSON('http://localhost:8000/commandplayer', function(data) {
		
		if (data.command !== "") {
			console.log(data);
		}

		switch (data.command) {			
			case 'startPlaylist':
				pressButton("play-button");
				break;
			case 'play':
				pressButton("control-button-playpause");
				break;
			case 'next':
				pressButton("control-button-skip-forward");
				break;
			case 'previous':
				pressButton("control-button-skip-back");
				break;			
			case 'shuffle':
				pressButton("control-button-shuffle");
				break;
		}
	});
}
setInterval(ControlLoop, 500);

function waitForElement(selector, callback, timeout = 15000) {
	const start = Date.now();

	let interval = setInterval(() => {
		const el = document.querySelector(selector);

		if (el) {
			clearInterval(interval);
			callback(el);
		} else if (Date.now() - start > timeout) {
			clearInterval(interval);
			callback(null);
		}
	}, 1000);
}

function pressButton(buttonId) {
	waitForElement("button[data-testid='" + buttonId + "']", (button) => {
		button.click();
	});
}