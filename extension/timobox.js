console.log("TimoBox Extension loaded!");

document.getElementById("btn-click").addEventListener("click", () => {
	console.log("Button clicked!");
	var newURL = "https://open.spotify.com/playlist/41o8ko4gsYRo00reQlvZdv";
	//chrome.tabs.create({ url: newURL });
	//chrome.tabs.update({ active: true, url: newURL });

	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		console.log(tabs[0]);
		chrome.scripting.executeScript(
			{
				target: { tabId: tabs[0].id },
				files: ['timobox_inject.js'],
				// function: () => {}, // files or function, both do not work.
			});
	});
});