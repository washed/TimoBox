console.log("TimoBox Spotify started");

var wakeup = function(){
    setTimeout(function(){
        chrome.runtime.sendMessage('ping', (response) => {
			console.log('received user data', response);
		});
        wakeup();
    }, 10000);
}
wakeup();

function addCommandListener() {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (!message) {
			return;
		}
		let command = JSON.parse(message);	
		console.log("Received command ", command);
		switch (command.command) {			
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
		sendResponse('ack');
	});
}

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

function sendPlayerReady() {
	chrome.runtime.sendMessage('ready', (response) => {
		console.log('received user data', response);
	});
}

let keys = "";
$(document).ready(() => {
    console.log("Ready");

	addCommandListener();
	sendPlayerReady();

    $(document).on('keypress',function(e) {
		if(e.which == 13) {
			console.log("send: " + keys);
            $.getJSON('http://localhost:8000/tag/' + keys + '/execute', function(data) {
                $("input").val("");
                $("input").focus();
            });
			keys = "";
        } else {
			keys += e.originalEvent.key;
		}
    });
});