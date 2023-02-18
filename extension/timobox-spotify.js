console.log("TimoBox Spotify started");

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

waitForElement("button[data-encore-id='buttonPrimary']", (button) => {
	button.click();
});